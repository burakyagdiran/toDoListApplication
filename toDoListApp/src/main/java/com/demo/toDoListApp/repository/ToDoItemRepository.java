package com.demo.toDoListApp.repository;

import com.demo.toDoListApp.entity.ToDoItem;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Date;
import java.util.List;

public interface ToDoItemRepository extends JpaRepository<ToDoItem,Long> {
List<ToDoItem> findByMyList_Id(Long id);
List<ToDoItem> findByDeadlineGreaterThanEqualAndMyList_IdOrderByDeadlineDesc(Date deadline,Long listId);
List<ToDoItem> findByDeadlineLessThanAndMyList_IdOrderByDeadlineDesc(Date expired, Long listId);
List<ToDoItem> findByMyList_IdOrderByItemName(Long id);
List<ToDoItem> findByMyList_IdOrderByStatus(Long id);
List<ToDoItem> findByMyList_IdOrderByDeadline(Long id);
List<ToDoItem> findByMyList_IdAndStatus(Long id, String name);
List<ToDoItem> findByMyList_IdOrderByCreateDate(Long id);
List<ToDoItem> findByMyList_IdAndItemNameContaining(Long id, String name);
List<ToDoItem> findByMyList_IdAndId(Long id, Long item_id);
}
