package com.stomp.demo.exception;

import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ControllerExceptionHandler {

  @ExceptionHandler(InvalidValueException.class)
  protected ResponseEntity<?> invalidError(
      InvalidValueException e) {
    ErrorResponse response = new ErrorResponse("1", e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(NotFoundEntityException.class)
  protected ResponseEntity<?> entityNotFoundError(
      NotFoundEntityException e) {
    ErrorResponse response = new ErrorResponse("2", e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(AuthenticationFailException.class)
  protected ResponseEntity<?> authenticationFailError(
      AuthenticationFailException e) {
    ErrorResponse response = new ErrorResponse("3", e.getMessage());
    return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
  }
}
