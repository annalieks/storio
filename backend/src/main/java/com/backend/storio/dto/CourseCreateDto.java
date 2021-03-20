package com.backend.storio.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
public class CourseCreateDto {

    @NotNull
    private final UUID userId;

    @NotNull
    private final String name;

    private final String description;

    private List<TagShortDto> tags;

    private List<SponsorShortDto> sponsors;

}
