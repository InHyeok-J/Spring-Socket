package com.stomp.demo.user;

import lombok.Getter;

@Getter
public class Token {
  private String accessToken;

  public Token(String accessToken) {
    this.accessToken = accessToken;
  }
}
