package com.backend.storio.mapper;

import com.backend.storio.dao.Assignment;
import com.backend.storio.dto.AssignmentPreviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface AssignmentMapper {

    AssignmentMapper MAPPER = Mappers.getMapper(AssignmentMapper.class);

    AssignmentPreviewDto assignmentToAssignmentPreviewDto(Assignment assignment);

}
