package com.backend.storio.mapper;

import com.backend.storio.dao.Post;
import com.backend.storio.dto.PostPreviewDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface PostMapper {

    PostMapper MAPPER = Mappers.getMapper(PostMapper.class);

    PostPreviewDto postToPostPreviewDto(Post Post);

}
