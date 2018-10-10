package com.demo.toDoListApp.controller;


import com.demo.toDoListApp.dao.ToDoListDAO;
import com.demo.toDoListApp.entity.ToDoList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ToDoListController {

    @Autowired
    ToDoListDAO toDoListDAO;

    @GetMapping("/lists/getAll/{userId}")
    @CrossOrigin(origins = "*")
    public List<ToDoList> getAllList(@PathVariable("userId") Long userId){
        return toDoListDAO.getAllList(userId);}

    @PostMapping("/lists/createList")
    @CrossOrigin(origins = "*")
    public ToDoList createList(@RequestBody ToDoList toDoList){
        return toDoListDAO.createList(toDoList);
    }

    @PutMapping("/lists/updateList")
    @CrossOrigin(origins = "*")
    public ToDoList updateList(@RequestBody ToDoList toDoList){
        return toDoListDAO.updateList(toDoList);
    }

    @DeleteMapping("/lists/deleteList/{id}")
    @CrossOrigin(origins = "*")
    public void deleteList(@PathVariable("id") Long id){
        toDoListDAO.deleteList(id);
    }

}
