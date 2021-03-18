package com.backend.storio.mapper;

import com.backend.storio.dao.User;
import com.backend.storio.dto.UserDetailsDto;
import com.backend.storio.dto.UserInfoDto;
import com.backend.storio.dto.UserRegisterDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    // ignore password to add it after encryption
    @Mapping(target = "password", ignore = true)
    User userRegisterDtoToUser(UserRegisterDto userRegisterDto);

    UserDetailsDto userToUserDetailsDto(User user);

    UserInfoDto userToUserInfoDto(User user);

}
