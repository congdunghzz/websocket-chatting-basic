package com.congdunghzz.chatServer.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Message {
    private String senderId;
    private String recipientId;
    private String content;
    private MessageStatus status;
}
