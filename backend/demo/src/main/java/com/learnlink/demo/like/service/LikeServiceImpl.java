package com.learnlink.demo.like.service;

import com.learnlink.demo.like.dto.LikeDTO;
import com.learnlink.demo.like.entity.Like;
import com.learnlink.demo.like.repository.LikeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LikeServiceImpl implements LikeService {

    @Autowired
    private LikeRepository repository;

    @Override
    public void addLike(LikeDTO dto) {
        if (!repository.existsByPostId(dto.getPostId())) {
            Like like = new Like();
            like.setPostId(dto.getPostId());
            repository.save(like);
        }
    }

    @Override
    @Transactional
    public void removeLike(LikeDTO dto) {
        repository.deleteByPostId(dto.getPostId());
    }

    @Override
    public long getLikeCount(Long postId) {
        return repository.countByPostId(postId);
    }

    @Override
    public boolean isPostLiked(Long postId) {
        return repository.existsByPostId(postId);
    }
}