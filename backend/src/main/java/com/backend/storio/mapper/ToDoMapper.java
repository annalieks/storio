package com.backend.storio.mapper;

import com.backend.storio.dao.ToDo;
import com.backend.storio.dto.ToDoDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ToDoMapper {

    ToDoMapper MAPPER = Mappers.getMapper(ToDoMapper.class);

    ToDoDto toDoToDto(ToDo toDo);

}
