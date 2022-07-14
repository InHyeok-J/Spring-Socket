package com.stomp.demo.chatroom;

import com.stomp.demo.chatroom.ChatRoom;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

  List<ChatRoom> findAll();
}
