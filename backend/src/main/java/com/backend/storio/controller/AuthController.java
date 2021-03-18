package com.backend.storio.controller;

import com.backend.storio.dto.LoggedInUserDto;
import com.backend.storio.dto.UserLoginDto;
import com.backend.storio.dto.UserRegisterDto;
import com.backend.storio.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public final class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public LoggedInUserDto login(@RequestBody UserLoginDto userLoginDto) {
        return authService.login(userLoginDto);
    }

    @PostMapping("/register")
    public LoggedInUserDto register(@RequestBody UserRegisterDto userRegisterDto) {
        return authService.register(userRegisterDto);
    }

}
