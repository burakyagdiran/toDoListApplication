package com.demo.toDoListApp.dao;

import com.demo.toDoListApp.entity.ToDoItem;
import com.demo.toDoListApp.repository.ToDoItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Date;
import java.util.List;

@Service
public class ToDoItemDAO {

    @Autowired
    ToDoItemRepository toDoItemRepository;

    //Search all item
    public List<ToDoItem> getAllItem(Long listid){
        return toDoItemRepository.findByMyList_Id(listid); }


    //Search deadline item
    public List<ToDoItem> getDeadline(Long listid, Date deadline){
        return toDoItemRepository.findByDeadlineGreaterThanEqualAndMyList_IdOrderByDeadlineDesc(deadline,listid); }

    //Search expired
    public List<ToDoItem> getExpired(Long listid, Date expired){
        return toDoItemRepository.findByDeadlineLessThanAndMyList_IdOrderByDeadlineDesc(expired,listid); }

    // Order By Item Name
    public  List<ToDoItem> orderByName(Long listid){
        return toDoItemRepository.findByMyList_IdOrderByItemName(listid);
    }
    // Order By Item Name
    public  List<ToDoItem> orderByStatus(Long listid){
        return toDoItemRepository.findByMyList_IdOrderByStatus(listid);
    }
    // Order By Item Name
    public  List<ToDoItem> orderByDeadline(Long listid){
        return toDoItemRepository.findByMyList_IdOrderByDeadline(listid);
    }

    // Order By Item Create Date
    public  List<ToDoItem> orderByCreateDate(Long listid){
        return toDoItemRepository.findByMyList_IdOrderByCreateDate(listid);
    }

    // Find By Status Name
    public  List<ToDoItem> findByStatus(Long listid, String name){
        return toDoItemRepository.findByMyList_IdAndStatus(listid , name);
    }

    // Find By Item Name
    public  List<ToDoItem> findByName(Long listid, String name){
        return toDoItemRepository.findByMyList_IdAndItemNameContaining(listid, name);
    }

    //create new item
    public ToDoItem createItem(ToDoItem toDoItem){return toDoItemRepository.save(toDoItem);}

    //update item
    public ToDoItem updateItem( ToDoItem toDoItem){
        return toDoItemRepository.save(toDoItem);
    }

    //delete item
    public void deleteItem(Long id){ toDoItemRepository.deleteById(id); }

    // find By Item Id
    public ToDoItem findByItemId(Long id){
        ToDoItem toDoItem = new ToDoItem();
        return toDoItemRepository.findById(id).isPresent()?toDoItemRepository.findById(id).get():toDoItem;
    }

    public Long checkDependency(Long id){

        String complete = "complete";
        ToDoItem toDoItem = toDoItemRepository.findById(id).isPresent()?toDoItemRepository.findById(id).get():null;
        long retval = 0;
        if(toDoItem.getDependencyId() != null) {
            String dependentStatus = null;
            ToDoItem dependentItem = toDoItemRepository.findById(toDoItem.getDependencyId()).isPresent() ? toDoItemRepository.findById(toDoItem.getDependencyId()).get() : null;
            dependentStatus = dependentItem.getStatus();

            if (dependentStatus.equalsIgnoreCase(complete)) {
                retval = 1;
            } else {
                retval = 0;
            }
        }
        else { retval = 1; }

        return retval;
    }
}
