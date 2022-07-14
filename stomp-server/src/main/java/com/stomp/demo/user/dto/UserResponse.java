package com.stomp.demo.user.dto;

import com.stomp.demo.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

  private Long userId;
  private String nickname;

  public static UserResponse of(User user) {
    return new UserResponse(user.getId(), user.getNickname());
  }
}
