package com.backend.storio.exception;

public class DuplicateEntityException extends RuntimeException {

    public DuplicateEntityException(final String message) {
        super(message);
    }

}
