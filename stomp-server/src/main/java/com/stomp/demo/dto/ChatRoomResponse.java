package com.stomp.demo.dto;

import com.stomp.demo.entity.ChatRoom;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatRoomResponse {

  private Long roomId;
  private String roomName;

  public static ChatRoomResponse of(ChatRoom room) {
    return new ChatRoomResponse(room.getId(), room.getName());
  }
}
