package com.backend.storio.mapper;

import com.backend.storio.dao.Tag;
import com.backend.storio.dto.TagShortDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface TagMapper {

    TagMapper MAPPER = Mappers.getMapper(TagMapper.class);

    Tag tagShortDtoToTag(TagShortDto tagShortDto);

}
