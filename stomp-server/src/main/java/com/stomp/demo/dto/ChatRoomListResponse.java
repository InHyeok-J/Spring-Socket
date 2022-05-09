package com.stomp.demo.dto;

import com.stomp.demo.entity.ChatRoom;
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
