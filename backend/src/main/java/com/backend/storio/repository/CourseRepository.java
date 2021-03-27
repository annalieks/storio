package com.backend.storio.repository;

import com.backend.storio.dao.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {

    List<Course> findCourseByName(String name);

    Optional<Course> findCourseById(UUID id);

}
