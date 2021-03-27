package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@Data
@AllArgsConstructor
public class PostPreviewDto {

    private final UUID id;

    private final String text;

    private final UserInfoDto author;

}
