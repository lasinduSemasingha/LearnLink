package com.learnlink.demo.like.service;

import com.learnlink.demo.like.dto.LikeDTO;

public interface LikeService {
    void addLike(LikeDTO dto);
    void removeLike(LikeDTO dto);
    long getLikeCount(Long postId);
    boolean isPostLiked(Long postId);
}