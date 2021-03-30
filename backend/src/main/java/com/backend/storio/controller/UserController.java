package com.backend.storio.controller;

import com.backend.storio.dto.CoursePreviewDto;
import com.backend.storio.dto.UserInfoDto;
import com.backend.storio.service.TokenService;
import com.backend.storio.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/user")
public final class UserController {

    private final UserService userService;

    @Autowired
    public UserController(final UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/info")
    public UserInfoDto getUserInfo() {
        return userService.findById(TokenService.getUserId());
    }

    @GetMapping("/info/{id}")
    public UserInfoDto getUserInfo(@PathVariable UUID id) {
        return userService.findById(id);
    }

    @GetMapping("/courses/student/preview")
    public List<CoursePreviewDto> getStudentCoursesPreview() {
        return userService.getCoursesPreview(TokenService.getUserId(), true);
    }

    @GetMapping("/courses/teacher/preview")
    public List<CoursePreviewDto> getTeacherCoursesPreview() {
        return userService.getCoursesPreview(TokenService.getUserId(), false);
    }

}