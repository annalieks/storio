package com.backend.storio.service;

import com.backend.storio.dao.Assignment;
import com.backend.storio.dao.Course;
import com.backend.storio.dao.User;
import com.backend.storio.dto.AssignmentCreateDto;
import com.backend.storio.exception.AccessRightsException;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.repository.AssignmentRepository;
import com.backend.storio.repository.CourseRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;

    private final CourseRepository courseRepository;

    private final UserRepository userRepository;

    @Autowired
    public AssignmentService(final AssignmentRepository assignmentRepository,
                             final CourseRepository courseRepository,
                             final UserRepository userRepository) {
        this.assignmentRepository = assignmentRepository;
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create assignment inside the course
     *
     * @param assignmentCreateDto assignment data
     */
    public void createAssignment(AssignmentCreateDto assignmentCreateDto) {
        Course course = courseRepository.findCourseById(assignmentCreateDto.getCourseId())
                .orElseThrow(() -> new EntityNotFoundException("No such course exists"));

        User user = userRepository.findUserById(TokenService.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("No such user exists"));

        if (!user.getId().equals(course.getCreator().getId())) {
            throw new AccessRightsException("Only teacher can create assignments");
        }

        Assignment assignment = new Assignment();
        assignment.setCourse(course);
        assignment.setTitle(assignmentCreateDto.getTitle());
        assignment.setDescription(assignmentCreateDto.getDescription());
        assignment.setMaxGrade(assignmentCreateDto.getMaxGrade());
        assignment.setDeadline(assignmentCreateDto.getDeadline());

        course.getAssignments().add(assignment);

        assignmentRepository.save(assignment);
        courseRepository.save(course);
    }

}
