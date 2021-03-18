package com.backend.storio.service;

import com.backend.storio.dao.User;
import com.backend.storio.dto.AuthUserDto;
import com.backend.storio.dto.UserDetailsDto;
import com.backend.storio.dto.UserInfoDto;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.mapper.UserMapper;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(final UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void createUser(User user) {
        userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserInfoDto findById(UUID id) {
        return userRepository.findUserById(id)
                .map(UserMapper.MAPPER::userToUserInfoDto)
                .orElseThrow(() -> new EntityNotFoundException("No user with id"));
    }

    @Override
    public AuthUserDto loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findByEmail(email).map(
                user -> new AuthUserDto(user.getId(), user.getEmail(), user.getPassword())
        ).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    public UserDetailsDto getUserById(UUID id) {
        return userRepository.findById(id)
                .map(UserMapper.MAPPER::userToUserDetailsDto)
                .orElseThrow(() -> new UsernameNotFoundException("No user found with such email"));
    }

}
