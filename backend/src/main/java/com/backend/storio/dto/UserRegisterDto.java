package com.backend.storio.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class UserRegisterDto {

    @NotNull
    private final String email;

    @NotNull
    private final String password;

    private final String firstName;

    private final String lastName;

}
