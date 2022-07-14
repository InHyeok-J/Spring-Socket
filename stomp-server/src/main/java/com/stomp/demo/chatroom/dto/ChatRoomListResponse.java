package com.stomp.demo.chatroom.dto;

import com.stomp.demo.chatroom.ChatRoom;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ChatRoomListResponse {

  private List<ChatRoom> rooms;

  public static ChatRoomListResponse of(List<ChatRoom> room) {
    return new ChatRoomListResponse(room);
  }
}
