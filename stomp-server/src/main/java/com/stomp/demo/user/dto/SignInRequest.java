package com.stomp.demo.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignInRequest {

  private String nickname;

  private String password;
}
