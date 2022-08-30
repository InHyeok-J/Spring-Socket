package com.stomp.demo.chatroom;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
public class ChatRoom {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "chat_room_id")
  private Long id;

  private String name;

  @OneToMany(mappedBy = "chatRoom")
  private List<Message> chatMessages = new ArrayList<>();

  @Builder
  public ChatRoom(String name) {
    this.name = name;
  }

  public void addMessage(Message message) {
    this.chatMessages.add(message);
  }
}
