package com.demo.toDoListApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name="my_Users")
public class User implements Serializable{


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",unique = true)
    private long id;

    @Column(name = "user_Name")
    private String userName;

    @Column(name = "password")
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "myUser", cascade = CascadeType.ALL)
    private List<ToDoList> toDoLists;

    public long getId() { return id; }

    public void setId(long id) { this.id = id;}

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<ToDoList> getToDoLists() {
        return toDoLists;
    }

    public void setToDoLists(List<ToDoList> toDoLists) {
        for(ToDoList toDoList : toDoLists){
            toDoList.setMyUser(this);
        }
        this.toDoLists = toDoLists;
    }
}
