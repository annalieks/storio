package com.backend.storio.repository;

import com.backend.storio.dao.Sponsor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface SponsorRepository extends JpaRepository<Sponsor, UUID> {

    List<Sponsor> findAllByIdIn(List<UUID> sponsorIds);

}
