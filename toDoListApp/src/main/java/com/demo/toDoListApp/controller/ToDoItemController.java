package com.demo.toDoListApp.controller;

import com.demo.toDoListApp.dao.ToDoItemDAO;
import com.demo.toDoListApp.entity.ToDoItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
public class ToDoItemController {

    @Autowired
    ToDoItemDAO toDoItemDAO;

    @GetMapping("/items/getAll/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> getAllItems(@PathVariable("listId") Long listId){ return toDoItemDAO.getAllItem(listId);}

    @GetMapping("/items/getDeadline/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> getDeadlineItems(@PathVariable("listId") Long listId){
        Date deadDate = new Date();
        deadDate.setHours(0);
        deadDate.setMinutes(0);
        deadDate.setSeconds(0);
        return toDoItemDAO.getDeadline(listId, deadDate);
    }

    @GetMapping("/items/getExpired/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> getExpired(@PathVariable("listId") Long listId){
        Date deadDate = new Date();
        deadDate.setHours(0);
        deadDate.setMinutes(0);
        deadDate.setSeconds(0);
        return toDoItemDAO.getExpired(listId, deadDate);
    }

    @GetMapping("/items/orderByName/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> orderByItemName(@PathVariable("listId") Long listId){
        return toDoItemDAO.orderByName(listId);
    }

    @GetMapping("/items/orderByStatus/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> orderByStatus(@PathVariable("listId") Long listId){
        return toDoItemDAO.orderByStatus(listId);
    }

    @GetMapping("/items/findByStatus/{statusName}/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> findByStatus(@PathVariable("listId") Long listId, @PathVariable("statusName") String statusName){
        return toDoItemDAO.findByStatus(listId, statusName);
    }

    @GetMapping("/items/findByName/{itemName}/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> findByName(@PathVariable("listId") Long listId, @PathVariable("itemName") String statusName){
        return toDoItemDAO.findByName(listId, statusName);
    }

    @GetMapping("/items/orderByDeadline/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> orderByDeadline(@PathVariable("listId") Long listId){
        return toDoItemDAO.orderByDeadline(listId);
    }

    @GetMapping("/items/orderByCreateDate/{listId}")
    @CrossOrigin(origins = "*")
    public List<ToDoItem> orderByCreateDate(@PathVariable("listId") Long listId){
        return toDoItemDAO.orderByCreateDate(listId);
    }

    @GetMapping("/items/findByItem/{itemId}")
    @CrossOrigin(origins = "*")
    public ToDoItem findByItemId(@PathVariable("itemId") Long itemId){
        return toDoItemDAO.findByItemId(itemId);
    }

    @GetMapping("/items/checkDependency/{itemId}")
    @CrossOrigin(origins = "*")
    public long checkDependency(@PathVariable("itemId") Long itemId){
        return toDoItemDAO.checkDependency(itemId);
    }

    @PostMapping("/items/createItem")
    @CrossOrigin(origins = "*")
    public ToDoItem createItem(@RequestBody ToDoItem toDoItem){
        return toDoItemDAO.createItem(toDoItem);
    }

    @PutMapping("/items/updateItem")
    @CrossOrigin(origins = "*")
    public ToDoItem updateItem( @RequestBody ToDoItem toDoItem){
        return  toDoItemDAO.updateItem(toDoItem);
    }

    @DeleteMapping("/items/deleteItem/{id}")
    @CrossOrigin( origins = "*")
    public void deleteItem(@PathVariable("id") Long id){ toDoItemDAO.deleteItem(id); }

}
