package com.backend.storio.controller;

import com.backend.storio.dto.CourseCreateDto;
import com.backend.storio.dto.CoursePreviewDto;
import com.backend.storio.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/course")
public final class CourseController {

    private final CourseService courseService;

    @Autowired
    public CourseController(final CourseService courseService) {
        this.courseService = courseService;
    }

    @PostMapping("/create")
    public void createCourse(@RequestBody CourseCreateDto courseDto) {
        courseService.createCourse(courseDto);
    }

}
