package com.backend.storio.repository;

import com.backend.storio.dao.ToDo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface ToDoRepository extends JpaRepository<ToDo, UUID> {
}
