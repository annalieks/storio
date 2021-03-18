package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoggedInUserDto {

    private String token;

    private UserDetailsDto user;

}

