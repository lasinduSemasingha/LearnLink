package com.learnlink.demo.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

import com.learnlink.demo.user.entity.*;
public interface AppUserRepository extends JpaRepository<AppUser, Long> {
    Optional<AppUser> findByGoogleId(String googleId);
    Optional<AppUser> findByEmail(String email); // Optional: Find by email
}