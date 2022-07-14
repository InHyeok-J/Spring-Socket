package com.stomp.demo.chatroom;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Message {

  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "message_id")
  private Long id;

  private String value;

  private Long senderId;

  @ManyToOne
  @JoinColumn(name = "char_room_id")
  private ChatRoom chatRoom;

  @Builder
  public Message(String value, Long senderId) {
    this.value = value;
    this.senderId = senderId;
  }
}
