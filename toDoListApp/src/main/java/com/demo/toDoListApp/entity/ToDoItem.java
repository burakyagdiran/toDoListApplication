package com.demo.toDoListApp.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "to_Do_Item")
public class ToDoItem implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String itemName;
    private String description;
    private String status;
    private Date deadline;
    private Date createDate;
    private Long dependencyId;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "Item_Id_Fk", nullable = false)
    private ToDoList myList;

    public long getId() { return id;}

    public void setId(long id) {this.id = id;}

    public String getItemName() {
        return itemName;
    }

    public void setItemName(String itemName) {
        this.itemName = itemName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getDeadline() { return deadline; }

    public void setDeadline(Date deadline) { this.deadline = deadline; }

    public ToDoList getMyList() { return myList; }

    public void setMyList(ToDoList myList) {this.myList = myList; }

    public Date getCreateDate() { return createDate; }

    public void setCreateDate(Date createDate) { this.createDate = createDate; }

    public Long getDependencyId() {
        return dependencyId;
    }

    public void setDependencyId(Long dependencyId) {
        this.dependencyId = dependencyId;
    }
}
