package com.backend.storio.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ToDoDto {

    private final UUID id;

    private final String text;

    private final boolean done;

}
