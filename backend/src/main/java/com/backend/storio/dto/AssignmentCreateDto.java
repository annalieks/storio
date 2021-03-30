package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
public class AssignmentCreateDto {

    private final UUID courseId;

    private final String title;

    private final String description;

    private final int maxGrade;

    private final LocalDateTime deadline;

}
