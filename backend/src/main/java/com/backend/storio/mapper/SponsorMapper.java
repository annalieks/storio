package com.backend.storio.mapper;

import com.backend.storio.dao.Sponsor;
import com.backend.storio.dto.SponsorInfo;
import com.backend.storio.dto.SponsorShortDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SponsorMapper {

    SponsorMapper MAPPER = Mappers.getMapper(SponsorMapper.class);

    Sponsor sponsorShortDtoToSponsor(SponsorShortDto sponsorShortDto);

    SponsorInfo sponsorToSponsorInfoDto(Sponsor sponsor);

}
