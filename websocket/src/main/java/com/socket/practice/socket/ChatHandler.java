package com.socket.practice.socket;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socket.practice.dto.ChatMessage;
import com.socket.practice.dto.ChatMessage.MessageType;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;


@Slf4j
public class ChatHandler extends TextWebSocketHandler {

  private final ChatRoom chatRoom = new ChatRoom();

  //세션 연결
  @Override
  public void afterConnectionEstablished(WebSocketSession session) throws Exception {
    super.afterConnectionEstablished(session);
    TextMessage textMessage = new TextMessage("하위!");
    session.sendMessage(textMessage);
  }

  @Override
  public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException {
    ObjectMapper objectMapper = new ObjectMapper();

    String payload = message.getPayload();
    log.info("payload {}", payload);
    ChatMessage receivechatMessage = objectMapper.readValue(payload, ChatMessage.class);

    chatRoom.handleActions(session, receivechatMessage);
  }
}
