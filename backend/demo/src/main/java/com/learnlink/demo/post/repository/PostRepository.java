package com.learnlink.demo.post.repository;

import com.learnlink.demo.post.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
