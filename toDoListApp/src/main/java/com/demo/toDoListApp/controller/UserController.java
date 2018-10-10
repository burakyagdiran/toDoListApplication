package com.demo.toDoListApp.controller;

import com.demo.toDoListApp.dao.UserDAO;
import com.demo.toDoListApp.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    UserDAO userDAO;

    @PostMapping("/users/createUser")
    @CrossOrigin(origins = "*")
    public User createUser(@RequestBody User user){
        return userDAO.create(user);
    }

    @GetMapping("/users/login")
    @CrossOrigin(origins = "*")
    public long validUser(@RequestHeader(value="userName") String userName,@RequestHeader(value="password") String password){
        return userDAO.isValidUser(userName,password);
    }

    @GetMapping("/users/getAll")
    @CrossOrigin(origins = "*")
    public List<User> getAllUsers(){ return userDAO.getAllUser();}

    @PutMapping ("/users/updatePassword/{userName}")
    @CrossOrigin(origins = "*")
    public User updatePassword(@PathVariable("userName") String userName, @RequestBody User user){
        return userDAO.updatePassword(userName,user);
    }

    @DeleteMapping("/users/deleteUser/{id}")
    @CrossOrigin(origins = "*")
    public void deleteList(@PathVariable("id") Long id){
        userDAO.deleteUser(id);
    }
}
