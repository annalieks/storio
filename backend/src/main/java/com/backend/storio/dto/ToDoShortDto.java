package com.backend.storio.dto;

import lombok.Data;

import java.util.UUID;

@Data
public class ToDoShortDto {

    private final String text;

    private final boolean done;

}
