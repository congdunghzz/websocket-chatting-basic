package com.congdunghzz.chatServer.service;


import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private List<String> userList = new ArrayList<>();

    public boolean addUser(String user){
        List<String> exitedUsers = userList.stream().filter(item -> item.equals(user)).toList();
        if (!exitedUsers.isEmpty()) return false;
        userList.add(user);
        return true;
    }
    public void removeUSer(String user){
        userList = userList.stream().filter(item -> !item.equals(user)).toList();
    }
    public List<String> getUserList(){
        return this.userList;
    }
}
