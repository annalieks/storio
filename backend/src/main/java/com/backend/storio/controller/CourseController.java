package com.backend.storio.controller;

import com.backend.storio.dto.CourseCreateDto;
import com.backend.storio.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/course")
public final class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(final CourseService courseService) {
        this.courseService = courseService;
    }

    @PutMapping("/create")
    public void createCourse(CourseCreateDto courseDto) {
        courseService.createCourse(courseDto);
    }

}
