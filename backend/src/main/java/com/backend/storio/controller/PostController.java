package com.backend.storio.controller;

import com.backend.storio.dto.PostCreateDto;
import com.backend.storio.service.PostService;
import com.backend.storio.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/post")
public final class PostController {

    private final PostService postService;

    @Autowired
    public PostController(final PostService postService) {
        this.postService = postService;
    }

    @PostMapping("/create")
    public void createPost(@RequestBody PostCreateDto postCreateDto) {
        postService.createPost(postCreateDto, TokenService.getUserId());
    }

}
