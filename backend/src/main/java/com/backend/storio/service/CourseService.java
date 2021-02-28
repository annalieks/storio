package com.backend.storio.service;

import com.backend.storio.dto.CourseCreateDto;
import com.backend.storio.exception.DuplicateEntityException;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.mapper.CourseMapper;
import com.backend.storio.repository.CourseRepository;
import com.backend.storio.repository.SponsorRepository;
import com.backend.storio.repository.TagRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    private final TagRepository tagRepository;

    private final SponsorRepository sponsorRepository;

    private final UserRepository userRepository;

    @Autowired
    public CourseService(final CourseRepository courseRepository,
                         final TagRepository tagRepository,
                         final SponsorRepository sponsorRepository,
                         final UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.tagRepository = tagRepository;
        this.sponsorRepository = sponsorRepository;
        this.userRepository = userRepository;
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
        var tags = tagRepository.findAllByIdIn(courseDto.getTags());
        var sponsors = sponsorRepository.findAllByIdIn(courseDto.getSponsors());
        course.setTags(tags);
        course.setSponsors(sponsors);
        user.get().setTeacherCourses(teacherCourses);
        course.setCreator(user.get());

        courseRepository.save(course);
        userRepository.save(user.get());
    }

}
