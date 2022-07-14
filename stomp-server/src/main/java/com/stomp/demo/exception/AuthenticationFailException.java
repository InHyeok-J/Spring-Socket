package com.stomp.demo.exception;

public class AuthenticationFailException extends RuntimeException{

  public AuthenticationFailException() {
  }

  public AuthenticationFailException(String message) {
    super(message);
  }
}
