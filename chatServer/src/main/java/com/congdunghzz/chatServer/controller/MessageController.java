package com.congdunghzz.chatServer.controller;

import com.congdunghzz.chatServer.entity.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat/all")
    @SendTo("/topic/public")
    public Message sendToPublic(@Payload Message message){
        return message;
    }

    @MessageMapping("/chat/user")
    public Message sendToUser (@Payload Message message){
        
        return message;
    }
}



