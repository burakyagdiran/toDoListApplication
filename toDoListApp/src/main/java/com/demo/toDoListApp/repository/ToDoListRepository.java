package com.demo.toDoListApp.repository;
import com.demo.toDoListApp.entity.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ToDoListRepository extends JpaRepository<ToDoList,Long>{
List<ToDoList> findByMyUser_Id(Long id);
}
