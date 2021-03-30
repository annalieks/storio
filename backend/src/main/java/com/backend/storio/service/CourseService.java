package com.backend.storio.service;

import com.backend.storio.dao.Course;
import com.backend.storio.dao.Sponsor;
import com.backend.storio.dao.Tag;
import com.backend.storio.dao.User;
import com.backend.storio.dto.*;
import com.backend.storio.exception.AccessRightsException;
import com.backend.storio.exception.DuplicateEntityException;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.mapper.*;
import com.backend.storio.repository.CourseRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    @Autowired
    public CourseService(final CourseRepository courseRepository,
                         final UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    /**
     * Get course assignments
     *
     * @param id course id
     * @return list of assignment previews
     */
    public List<AssignmentPreviewDto> getAssignments(UUID id) {
        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        return course.getAssignments().stream()
                .map(AssignmentMapper.MAPPER::assignmentToAssignmentPreviewDto)
                .collect(Collectors.toList());
    }

    /**
     * Get the list of course sponsors
     *
     * @param id course id
     * @return list of sponsor info
     */
    public List<SponsorInfo> getSponsors(UUID id) {
        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        return course.getSponsors().stream()
                .map(SponsorMapper.MAPPER::sponsorToSponsorInfoDto)
                .collect(Collectors.toList());
    }

    /**
     * Get the course teacher
     *
     * @param id course id
     * @return teacher info
     */
    public UserInfoDto getTeacher(UUID id) {
        if (!isCourseMember(id, TokenService.getUserId()))
            throw new AccessRightsException("Course students can be viewed only by the members");

        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        return UserMapper.MAPPER.userToUserInfoDto(course.getCreator());
    }

    /**
     * Get all course students
     *
     * @param id course id
     * @return list of course students
     */
    public List<UserInfoDto> getStudents(UUID id) {
        if (!isCourseMember(id, TokenService.getUserId()))
            throw new AccessRightsException("Course students can be viewed only by the members");

        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        return course.getStudents().stream()
                .map(UserMapper.MAPPER::userToUserInfoDto)
                .collect(Collectors.toList());
    }

    /**
     * Add student to the course by email
     *
     * @param courseId      id of the course
     * @param currentUserId id of the current user
     * @param email         student email
     */
    public void addStudent(UUID courseId, UUID currentUserId, String email) {
        Course course = courseRepository.findCourseById(courseId)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        if (!currentUserId.equals(course.getCreator().getId())) {
            throw new AccessRightsException("Only course teacher can add students");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException("No user with such email exist"));

        if (course.getStudents().stream().anyMatch(s -> s.getId().equals(user.getId()))) {
            throw new DuplicateEntityException("The user is already a class student");
        }

        course.getStudents().add(user);
        courseRepository.save(course);
    }

    /**
     * Returns all course posts
     *
     * @param id course id
     * @return list of course posts
     */
    public List<PostPreviewDto> getPosts(UUID id) {
        if (!isCourseMember(id, TokenService.getUserId()))
            throw new AccessRightsException("Course posts can be viewed only by the members");

        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        return course.getPosts()
                .stream()
                .map(PostMapper.MAPPER::postToPostPreviewDto)
                .collect(Collectors.toList());
    }

    /**
     * Returns the necessary information about the course
     *
     * @param id course id
     * @return CourseInfoDto containing the information
     */
    public CourseInfoDto getCourseInfo(final UUID id) {
        if (!isCourseMember(id, TokenService.getUserId()))
            throw new AccessRightsException("Course info can be viewed only by the members");

        Course course = courseRepository.findCourseById(id)
                .orElseThrow(() -> new EntityNotFoundException("No course with such id"));

        UserInfoDto teacher = UserMapper.MAPPER.userToUserInfoDto(course.getCreator());

        List<String> tags = course.getTags().stream()
                .map(Tag::getName)
                .collect(Collectors.toList());

        return CourseInfoDto.builder()
                .id(course.getId())
                .name(course.getName())
                .description(course.getDescription())
                .teacher(teacher)
                .tags(tags)
                .build();
    }

    /**
     * Adds course to the database
     *
     * @param courseDto DTO used to create a course
     * @throws EntityNotFoundException custom exception that appears when no
     *                                 creator with id provided in dto exists in the database
     */
    public void createCourse(final CourseCreateDto courseDto) {
        var course = CourseMapper.MAPPER.courseCreateDtoToCourse(courseDto);
        var user = userRepository.findUserById(courseDto.getUserId());
        if (user.isEmpty()) {
            throw new EntityNotFoundException("No creator with such user id was found");
        }

        var teacherCourses = user.get().getTeacherCourses();
        boolean duplicateExists = teacherCourses.stream().anyMatch(c -> c.getName().equals(courseDto.getName()));
        if (duplicateExists) {
            throw new DuplicateEntityException("Course with such name already exists");
        }

        teacherCourses.add(course);

        List<Tag> tags = courseDto.getTags().stream()
                .map(TagMapper.MAPPER::tagShortDtoToTag).collect(Collectors.toList());

        List<Sponsor> sponsors = courseDto.getSponsors().stream()
                .map(SponsorMapper.MAPPER::sponsorShortDtoToSponsor).collect(Collectors.toList());

        course.setTags(tags);
        course.setSponsors(sponsors);
        user.get().setTeacherCourses(teacherCourses);
        course.setCreator(user.get());

        courseRepository.save(course);
        userRepository.save(user.get());
    }

    private boolean isCourseMember(UUID courseId, UUID userId) {
        Optional<Course> courseOptional = courseRepository.findCourseById(courseId);
        if (courseOptional.isEmpty())
            return false;
        Course course = courseOptional.get();
        return userId.equals(course.getCreator().getId())
                || course.getStudents().stream().anyMatch(s -> s.getId().equals(userId));
    }

}
