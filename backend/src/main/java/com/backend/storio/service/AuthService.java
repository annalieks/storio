package com.backend.storio.service;

import com.backend.storio.dto.UserLoginDto;
import com.backend.storio.dto.UserRegisterDto;
import com.backend.storio.exception.CredentialsException;
import com.backend.storio.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public final class AuthService {

    private final PasswordEncoder passwordEncoder;

    private final UserService userService;

    private final AuthenticationManager authenticationManager;

    @Autowired
    public AuthService(final PasswordEncoder passwordEncoder,
                       final UserService userService,
                       final AuthenticationManager authenticationManager) {
        this.passwordEncoder = passwordEncoder;
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    public boolean register(final UserRegisterDto userRegisterDto) {
        var existingUser = userService.findByEmail(userRegisterDto.getEmail());
        if (existingUser.isPresent()) {
            throw new CredentialsException("User with such email already exists");
        }
        var user = UserMapper.MAPPER.userRegisterDtoToUser(userRegisterDto);
        user.setPassword(passwordEncoder.encode(userRegisterDto.getPassword()));
        userService.createUser(user);
        return true;
    }

    public boolean login(final UserLoginDto userLoginDto) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            userLoginDto.getEmail(),
                            userLoginDto.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new CredentialsException("Could not login");
        }
        return true;
    }

}
