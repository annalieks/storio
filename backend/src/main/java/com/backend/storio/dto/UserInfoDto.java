package com.backend.storio.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class UserInfoDto {

    final UUID id;

    final String email;

    final String firstName;

    final String lastName;

}
