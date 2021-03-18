package com.backend.storio.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserDetailsDto {

    private UUID id;

    private String email;

}
