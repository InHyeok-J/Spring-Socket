package com.socket.practice.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socket.practice.dto.ChatMessage;
import com.socket.practice.dto.ChatMessage.MessageType;
import java.io.IOException;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

@Slf4j
@Getter
public class ChatRoom {

  private Set<WebSocketSession> room = new HashSet<>();

  public void handleActions(WebSocketSession session, ChatMessage chatMessage) {
    if (chatMessage.getType().equals(MessageType.ENTER)) {
      room.add(session);
      chatMessage.setMessage(chatMessage.getNickname() + " 님이 입장하셨습니다.");
    }
    sendRoomMessage(chatMessage);
  }

  public void sendRoomMessage(ChatMessage chatMessage) {
    room.parallelStream()
        .forEach(session -> send(session, chatMessage));
  }

  private void send(WebSocketSession session, ChatMessage chatMessage) {
    ObjectMapper objectMapper = new ObjectMapper();
    try {
      session.sendMessage(new TextMessage(objectMapper.writeValueAsString(chatMessage)));
    } catch (IOException e) {
      log.error(e.getMessage(), e);
    }
  }
}
