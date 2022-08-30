package com.stomp.demo.chatroom;

import com.stomp.demo.chatroom.dto.CreateRoomRequest;
import com.stomp.demo.exception.NotFoundEntityException;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

  private final ChatRoomRepository chatRoomRepository;

  public void creatRoom(CreateRoomRequest req) {
    chatRoomRepository.save(req.toEntity());
  }

  public List<ChatRoom> getRoomList() {
    return chatRoomRepository.findAll();
  }

  public ChatRoom getRoom(Long roomId) {
    Optional<ChatRoom> findRoom = chatRoomRepository.findById(roomId);
    findRoom.orElseThrow(() -> new NotFoundEntityException("room"));
    return findRoom.get();
  }
}
