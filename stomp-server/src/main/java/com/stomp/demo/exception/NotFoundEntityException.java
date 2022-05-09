package com.stomp.demo.exception;

public class NotFoundEntityException extends RuntimeException {

  public NotFoundEntityException(String entity) {
    super(entity + "을 찾을 수 없습니다.");
  }
}
