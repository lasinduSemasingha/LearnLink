package com.learnlink.demo.post.service;

import com.learnlink.demo.learning.dto.CourseDTO;
import com.learnlink.demo.post.dto.PostDTO;
import com.learnlink.demo.post.entity.Post;

import java.util.List;

public interface PostService {
    PostDTO createPost(PostDTO dto);
    PostDTO getPost(Long id);
    List<PostDTO> getAllPosts();
    PostDTO updatePost(Long id, PostDTO dto);
    void deletePost(Long id);
}