package com.backend.storio.service;

import com.backend.storio.dao.User;
import com.backend.storio.dto.*;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.mapper.ToDoMapper;
import com.backend.storio.mapper.UserMapper;
import com.backend.storio.repository.ToDoRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final ToDoRepository toDoRepository;

    @Autowired
    public UserService(final UserRepository userRepository,
                       final ToDoRepository toDoRepository) {
        this.userRepository = userRepository;
        this.toDoRepository = toDoRepository;
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

    /**
     * Get all user todos
     *
     * @return List of user todos
     */
    public List<ToDoDto> getUserToDos() {
        return toDoRepository.findAllByAuthorIdOrderByCreatedAt(TokenService.getUserId())
                .stream()
                .map(ToDoMapper.MAPPER::toDoToDto)
                .collect(Collectors.toList());
    }

    /**
     * Finds short info about the user's courses
     *
     * @param id             id of the user for whom the courses will be found
     * @param studentCourses true to fetch student courses, false - to fetch author courses
     * @return list of courses previews
     */
    public List<CoursePreviewDto> getCoursesPreview(UUID id, boolean studentCourses) {
        var user = userRepository.findUserById(id)
                .orElseThrow(() -> new EntityNotFoundException("No such user exists"));

        var courses = studentCourses
                ? user.getStudentCourses()
                : user.getTeacherCourses();

        return courses.stream()
                .map(c -> new CoursePreviewDto(c.getId(), c.getName(), c.getStudents().size()))
                .collect(Collectors.toList());

    }

}
