package com.learnlink.demo.test;

import com.learnlink.demo.user.entity.AppUser;
import com.learnlink.demo.user.repository.AppUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/test")
public class UserTestController {

    @Autowired
    private AppUserRepository appUserRepository;

    @GetMapping("/users")
    public List<AppUser> getAllUsers() {
        return appUserRepository.findAll();
    }
}