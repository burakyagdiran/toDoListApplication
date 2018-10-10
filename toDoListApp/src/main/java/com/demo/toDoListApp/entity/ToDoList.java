package com.demo.toDoListApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "to_Do_Lists")
public class ToDoList implements Serializable{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "list_Id_Fk", nullable = false)
    private User myUser;

    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "myList", cascade = CascadeType.ALL)
    private List<ToDoItem> toDoItems;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getMyUser() {
        return myUser;
    }

    public void setMyUser(User myUser) {
        this.myUser = myUser;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<ToDoItem> getToDoItems() {
        return toDoItems;
    }

    public void setToDoItems(List<ToDoItem> toDoItems) {
        for(ToDoItem toDoItem : toDoItems){
            toDoItem.setMyList(this);
        }
        this.toDoItems = toDoItems;
    }
}
