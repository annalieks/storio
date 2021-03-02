package com.backend.storio.dto;

import com.sun.istack.NotNull;
import lombok.Data;

@Data
public class UserLoginDto {

    @NotNull
    private final String email;

    @NotNull
    private final String password;

}
