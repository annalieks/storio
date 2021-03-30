package com.backend.storio.controller;

import com.backend.storio.dto.AssignmentCreateDto;
import com.backend.storio.dto.PostCreateDto;
import com.backend.storio.service.AssignmentService;
import com.backend.storio.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/assignment")
public final class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(final AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    @PostMapping("/create")
    public void createPost(@RequestBody AssignmentCreateDto assignmentCreateDto) {
        assignmentService.createAssignment(assignmentCreateDto);
    }

}
