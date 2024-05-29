package com.congdunghzz.chatServer.controller;

import com.congdunghzz.chatServer.entity.Message;
import com.congdunghzz.chatServer.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessagingTemplate messagingTemplate;
    private final UserService userService;

    @MessageMapping("/chat/all")
    @SendTo("/topic/public")
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
    @SendTo("/topic/public")
    public String addUser(@Payload String user){
        if(userService.addUser(user)){
            return null;
        }
        return user;
    }


    @MessageMapping("/user/remove")
    @SendTo("/topic/public")
    public String removeUser(@Payload String user){
        userService.removeUSer(user);
        return user;
    }

    @GetMapping("/user")
    public List<String> getUsers(){
        return userService.getUserList();
    }
}



