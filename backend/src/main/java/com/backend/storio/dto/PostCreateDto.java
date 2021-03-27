package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class PostCreateDto {

    private final UUID courseId;

    private final String text;

}
