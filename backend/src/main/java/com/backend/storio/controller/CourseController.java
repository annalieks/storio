package com.backend.storio.controller;

import com.backend.storio.dto.CourseCreateDto;
import com.backend.storio.dto.CourseInfoDto;
import com.backend.storio.dto.CoursePreviewDto;
import com.backend.storio.dto.PostPreviewDto;
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

    @GetMapping("/info/{id}")
    public CourseInfoDto getCourseInfo(@PathVariable UUID id) {
        return courseService.getCourseInfo(id);
    }

    @GetMapping("/posts/{id}")
    public List<PostPreviewDto> getPosts(@PathVariable UUID id) {
        return courseService.getPosts(id);
    }

    @PostMapping("/create")
    public void createCourse(@RequestBody CourseCreateDto courseDto) {
        courseService.createCourse(courseDto);
    }

}
