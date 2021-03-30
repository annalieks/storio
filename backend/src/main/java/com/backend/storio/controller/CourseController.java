package com.backend.storio.controller;

import com.backend.storio.dto.*;
import com.backend.storio.service.CourseService;
import com.backend.storio.service.TokenService;
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

    @GetMapping("/students/{id}")
    public List<UserInfoDto> getStudents(@PathVariable UUID id) {
        return courseService.getStudents(id);
    }

    @GetMapping("/sponsors/{id}")
    public List<SponsorInfo> getSponsors(@PathVariable UUID id) {
        return courseService.getSponsors(id);
    }

    @GetMapping("/assignments/{id}")
    public List<AssignmentPreviewDto> getAssignments(@PathVariable UUID id) {
        return courseService.getAssignments(id);
    }

    @PostMapping("/create")
    public void createCourse(@RequestBody CourseCreateDto courseDto) {
        courseService.createCourse(courseDto);
    }

    @PostMapping("/student")
    public void addStudent(@RequestBody AddStudentDto addStudentDto) {
        courseService.addStudent(addStudentDto.getCourseId(),
                TokenService.getUserId(), addStudentDto.getEmail());
    }

}
