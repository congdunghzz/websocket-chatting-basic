package com.congdunghzz.chatServer.service;


import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {
    private Set<String> userList = new HashSet<String>();

    public boolean addUser(String user){
        List<String> exitedUsers = userList.stream().filter(item -> item.equals(user)).toList();
        if (!exitedUsers.isEmpty()) return false;
        userList.add(user);
        return true;
    }
    public void removeUSer(String user){
        userList.remove(user);
    }
    public Set<String> getUserList(){
        return this.userList;
    }
}
