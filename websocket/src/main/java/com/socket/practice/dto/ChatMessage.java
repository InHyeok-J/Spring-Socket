package com.socket.practice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Setter
public class ChatMessage {

  private final String roomId = "common";
  private String nickname;
  private String message;
  private MessageType type;

  public enum MessageType {
    ENTER, TALK
  }

  @Builder
  public ChatMessage(String nickname, String message, MessageType type) {
    this.nickname = nickname;
    this.message = message;
    this.type = type;
  }
}
