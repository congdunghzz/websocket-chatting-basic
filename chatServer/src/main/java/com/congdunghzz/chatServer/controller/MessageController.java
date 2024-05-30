package com.congdunghzz.chatServer.controller;

import com.congdunghzz.chatServer.entity.Message;
import com.congdunghzz.chatServer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;

import org.springframework.messaging.simp.SimpMessagingTemplate;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    @MessageMapping("/chat/all")
    @SendTo("/chatroom/public")
    public Message sendToPublic(@Payload Message message){
        return message;
    }

    @MessageMapping("/chat/user")
    public Message sendToUser (@Payload Message message){
        messagingTemplate
                .convertAndSendToUser(message.getRecipientId(),
                "/queue/update", message);
        return message;
    }

    @MessageMapping("/user/add")
    @SendTo("/chatroom/public")
    public Message addUser(@Payload Message message){

        if(!userService.addUser(message.getSenderId())){
            return null;
        }
        return message;
    }

    @MessageMapping("/user/disconnect")
    @SendTo("/chatroom/public")
    public Message disconnect(@Payload Message message){
        userService.removeUSer(message.getSenderId());
        return message;
    }

    @GetMapping("/user")
    public Set<String> getUsers(){
        return userService.getUserList();
    }
}



