package com.stomp.demo.dto;

import com.stomp.demo.entity.ChatRoom;
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
