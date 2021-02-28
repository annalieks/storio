package com.backend.storio.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.userdetails.User;

import java.util.Collections;
import java.util.UUID;

public class AuthUserDto extends User {

    @Getter
    @Setter
    private UUID id;

    public AuthUserDto(final UUID id,
                       final String email,
                       final String password) {
        super(email, password, Collections.emptyList());
        this.id = id;
    }

}
