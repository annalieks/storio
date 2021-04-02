package com.backend.storio.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@AllArgsConstructor
@Data
public class CourseCreateDto {

    @NotNull
    private final String name;

    private final String description;

    private List<TagShortDto> tags;

    private List<SponsorShortDto> sponsors;

}
