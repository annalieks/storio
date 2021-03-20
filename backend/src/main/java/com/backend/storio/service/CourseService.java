package com.backend.storio.service;

import com.backend.storio.dao.Sponsor;
import com.backend.storio.dao.Tag;
import com.backend.storio.dto.CourseCreateDto;
import com.backend.storio.dto.CoursePreviewDto;
import com.backend.storio.exception.DuplicateEntityException;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.mapper.CourseMapper;
import com.backend.storio.mapper.SponsorMapper;
import com.backend.storio.mapper.TagMapper;
import com.backend.storio.repository.CourseRepository;
import com.backend.storio.repository.SponsorRepository;
import com.backend.storio.repository.TagRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
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

}
