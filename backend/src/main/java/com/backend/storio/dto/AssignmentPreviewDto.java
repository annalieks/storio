package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AssignmentPreviewDto {

    private final UUID id;

    private final String title;

    private final UserInfoDto author;

    private final LocalDateTime deadline;

}
