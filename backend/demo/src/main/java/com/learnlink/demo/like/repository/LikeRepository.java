package com.learnlink.demo.like.repository;

import com.learnlink.demo.like.entity.Like;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeRepository extends JpaRepository<Like, Long> {
    long countByPostId(Long postId);
    void deleteByPostId(Long postId);
    boolean existsByPostId(Long postId);
}