package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

@AllArgsConstructor
@Data
public class CoursePreviewDto {

    private final UUID id;

    private final String name;

    private final int studentsNum;

}
