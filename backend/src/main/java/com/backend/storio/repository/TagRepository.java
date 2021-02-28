package com.backend.storio.repository;

import com.backend.storio.dao.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TagRepository extends JpaRepository<Tag, UUID> {

    List<Tag> findAllByIdIn(List<UUID> tagIds);

}
