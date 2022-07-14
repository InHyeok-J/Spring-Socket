package com.stomp.demo.chatroom.dto;

import com.stomp.demo.chatroom.ChatRoom;
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
