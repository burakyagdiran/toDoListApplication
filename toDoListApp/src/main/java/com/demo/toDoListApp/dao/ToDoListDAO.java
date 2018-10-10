package com.demo.toDoListApp.dao;

import com.demo.toDoListApp.entity.ToDoList;
import com.demo.toDoListApp.repository.ToDoListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class ToDoListDAO {

    @Autowired
    ToDoListRepository toDoListRepository;

    @Autowired
    UserDAO userDAO;

    //search all list
    public List<ToDoList> getAllList( Long userid){
    return toDoListRepository.findByMyUser_Id(userid);
    }

    //create new List
    public ToDoList createList(ToDoList toDoList){

        return toDoListRepository.save(toDoList);}

    //update list
    public ToDoList updateList(ToDoList toDoList){
        return toDoListRepository.save(toDoList);
    }

    //delete list
    public void deleteList( Long id){ toDoListRepository.deleteById(id);}

}
