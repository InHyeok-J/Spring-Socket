package com.stomp.demo.controller;

import com.stomp.demo.dto.ChatRoomListResponse;
import com.stomp.demo.dto.ChatRoomResponse;
import com.stomp.demo.dto.CreateRoomRequest;
import com.stomp.demo.entity.ChatRoom;
import com.stomp.demo.service.ChatRoomService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatRoomController {

  private final ChatRoomService chatRoomService;

  @PostMapping("/api/room")
  public ResponseEntity<?> creatRoom(@RequestBody CreateRoomRequest request) {
    ChatRoom chatRoom = chatRoomService.creatRoom(request);
    return ResponseEntity.ok()
        .body(ChatRoomResponse.of(chatRoom));
  }

  @GetMapping("/api/room/list")
  public ResponseEntity<?> getRoomList() {
    List<ChatRoom> roomList = chatRoomService.getRoomList();
    return ResponseEntity.ok()
        .body(ChatRoomListResponse.of(roomList));
  }

  @GetMapping("/api/room/{idx}")
  public ResponseEntity<?> getRoomOne(@PathVariable Long idx) {
    ChatRoom room = chatRoomService.getRoom(idx);
    return ResponseEntity.ok()
        .body(ChatRoomResponse.of(room));
  }
}
