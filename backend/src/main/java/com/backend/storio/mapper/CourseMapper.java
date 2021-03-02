package com.backend.storio.mapper;

import com.backend.storio.dao.Course;
import com.backend.storio.dto.CourseCreateDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CourseMapper {

    CourseMapper MAPPER = Mappers.getMapper(CourseMapper.class);

    // ignore tags and sponsors to manually insert them later by id
    @Mapping(target = "tags", ignore = true)
    @Mapping(target = "sponsors", ignore = true)
    Course courseCreateDtoToCourse(CourseCreateDto courseCreateDto);

}
