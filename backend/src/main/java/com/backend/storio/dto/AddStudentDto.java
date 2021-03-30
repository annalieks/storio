package com.backend.storio.dto;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Data
@Builder
public class AddStudentDto {

    @NotNull
    private final UUID courseId;

    @NotNull
    private final String email;

}
