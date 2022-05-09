package com.stomp.demo.service;

import com.stomp.demo.dto.CreateRoomRequest;
import com.stomp.demo.entity.ChatRoom;
import com.stomp.demo.exception.NotFoundEntityException;
import com.stomp.demo.repository.ChatRoomRepository;
import java.util.List;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ChatRoomService {

  private final ChatRoomRepository chatRoomRepository;

  public ChatRoom creatRoom(CreateRoomRequest req) {
    return chatRoomRepository.save(req.toEntity());
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
