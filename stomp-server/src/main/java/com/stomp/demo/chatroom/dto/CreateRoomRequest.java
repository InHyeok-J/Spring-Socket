package com.stomp.demo.chatroom.dto;

import com.stomp.demo.chatroom.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateRoomRequest {

  private String roomName;

  public ChatRoom toEntity() {
    return ChatRoom.builder()
        .name(roomName)
        .build();
  }
}
