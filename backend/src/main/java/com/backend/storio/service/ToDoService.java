package com.backend.storio.service;

import com.backend.storio.dao.ToDo;
import com.backend.storio.dao.User;
import com.backend.storio.dto.ToDoShortDto;
import com.backend.storio.exception.EntityNotFoundException;
import com.backend.storio.repository.ToDoRepository;
import com.backend.storio.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class ToDoService {

    private final ToDoRepository toDoRepository;

    private final UserRepository userRepository;

    @Autowired
    public ToDoService(final ToDoRepository toDoRepository,
                       final UserRepository userRepository) {
        this.toDoRepository = toDoRepository;
        this.userRepository = userRepository;
    }

    /**
     * Create a to do for the current user
     *
     * @param text to do text
     */
    public void createToDo(String text) {
        User user = userRepository.findUserById(TokenService.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("No such user exists"));

        ToDo toDo = new ToDo();
        toDo.setDone(false);
        toDo.setText(text);
        toDo.setAuthor(user);

        user.getTodos().add(toDo);

        toDoRepository.save(toDo);
        userRepository.save(user);
    }

    /**
     * Change the state of the to do
     *
     * @param id      id of the to do to change
     * @param toDoDto new to do information
     */
    public void changeToDo(UUID id, ToDoShortDto toDoDto) {
        ToDo toDo = toDoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No to do with such id exists"));

        toDo.setDone(toDoDto.isDone());
        toDo.setText(toDoDto.getText());

        toDoRepository.save(toDo);
    }

    public void deleteToDo(UUID id) {
        ToDo toDo = toDoRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("No to do with such id exists"));

        toDoRepository.deleteById(toDo.getId());
    }

}
