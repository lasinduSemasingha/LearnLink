package com.learnlink.demo.interaction.repository;


import com.learnlink.demo.interaction.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}