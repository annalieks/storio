package com.backend.storio.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class CourseInfoDto {

    private final UUID id;

    private final String name;

    private final String description;

    private final UserInfoDto teacher;

    private final List<String> tags;

}
