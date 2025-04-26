package com.learnlink.demo.post.controller;

import com.learnlink.demo.post.dto.PostDTO;
import com.learnlink.demo.post.entity.Post;
import com.learnlink.demo.post.exeption.ResourceNotFoundException;
import com.learnlink.demo.post.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/post")
@CrossOrigin("*")

public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping
    public ResponseEntity<PostDTO> create(@RequestBody PostDTO dto) {
        return ResponseEntity.ok(postService.createPost(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDTO> get(@PathVariable Long id) {
        PostDTO post = postService.getPost(id);
        if (post == null) {
            throw new ResourceNotFoundException("Post not found with id: " + id);
        }
        return ResponseEntity.ok(post);
    }

    @GetMapping
    public ResponseEntity<List<PostDTO>> getAll() {
        return ResponseEntity.ok(postService.getAllPosts());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDTO> update(@PathVariable Long id, @RequestBody PostDTO dto) {
        PostDTO updated = postService.updatePost(id, dto);
        if (updated == null) {
            throw new ResourceNotFoundException("Post not found with id: " + id);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.deletePost(id);
        return ResponseEntity.noContent().build();
    }
}
