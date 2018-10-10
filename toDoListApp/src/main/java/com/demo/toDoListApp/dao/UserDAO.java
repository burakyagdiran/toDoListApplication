package com.demo.toDoListApp.dao;

import com.demo.toDoListApp.entity.User;
import com.demo.toDoListApp.repository.UserRepository;
import io.swagger.annotations.Example;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Service
public class UserDAO {

    @Autowired
    UserRepository userRepository;


    //Search all users
    public List<User> getAllUser(){return userRepository.findAll();}

    //create new User
    public User create( User user){
        return userRepository.save(user);
    }

    //update user password
    public User updatePassword( String userName, User user){
        user.setUserName(userName);
        return userRepository.save(user);

    }
    //delete list
    public void deleteUser( Long id){ userRepository.deleteById(id);}

    //find registered User
    public Long isValidUser(String userName, String password){
        long retVal = 0;
        try {
            User users =userRepository.findByUserNameAndPassword(userName,password);
            if(users != null){
                retVal = users.getId();
            }
            else{
                retVal = 0;
            }
        }
        catch (Exception ex){
            retVal = 0;
        }
        return retVal;
    }



}
