package com.backend.storio.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.text.MessageFormat;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(EntityNotFoundException.class)
    private ResponseEntity<Object> handleEntityNotFound(final EntityNotFoundException e) {
        return ResponseEntity.status(404).body(
                MessageFormat.format("No such entity: {0}", e.getMessage())
        );
    }

    @ExceptionHandler(CredentialsException.class)
    private ResponseEntity<Object> handleLoginError(final CredentialsException e) {
        return ResponseEntity.status(403).body(
                MessageFormat.format("Invalid credentials: {0}", e.getMessage())
        );
    }

}
