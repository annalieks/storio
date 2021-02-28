package com.backend.storio.repository;

import com.backend.storio.dao.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {

    Optional<User> findUserById(final UUID id);

    Optional<User> findByEmail(final String email);

}
