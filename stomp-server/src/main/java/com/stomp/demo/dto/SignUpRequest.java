package com.stomp.demo.dto;

import com.stomp.demo.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpRequest {

  private String nickname;

  private String password;

  public User toEntity() {
    return User.builder()
        .nickname(nickname)
        .password(password)
        .build();
  }
}
