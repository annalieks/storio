package com.backend.storio.controller;

import com.backend.storio.dto.ToDoCreateDto;
import com.backend.storio.dto.ToDoShortDto;
import com.backend.storio.service.ToDoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/todo")
public final class ToDoController {

    private final ToDoService toDoService;

    @Autowired
    public ToDoController(final ToDoService toDoService) {
        this.toDoService = toDoService;
    }

    @PostMapping("/create")
    public void create(@RequestBody ToDoCreateDto toDoCreateDto) {
        toDoService.createToDo(toDoCreateDto.getText());
    }

    @PutMapping("/change/{id}")
    public void change(@PathVariable UUID id, @RequestBody ToDoShortDto toDoShortDto) {
        toDoService.changeToDo(id, toDoShortDto);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable UUID id) {
        toDoService.deleteToDo(id);
    }

}
