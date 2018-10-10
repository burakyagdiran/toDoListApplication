package com.demo.toDoListApp.repository;

import com.demo.toDoListApp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {
    User findByUserNameAndPassword(String userName, String password);
}
