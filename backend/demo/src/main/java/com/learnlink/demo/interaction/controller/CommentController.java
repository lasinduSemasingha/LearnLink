package com.learnlink.demo.interaction.controller;

import java.util.List;

import com.learnlink.demo.interaction.dto.CommentDTO;
import com.learnlink.demo.interaction.exception.ResourceNotFoundException;
import com.learnlink.demo.interaction.service.CommentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class CommentController {

    @Autowired
    private CommentService commentService;

    // Handle POST requests to create a new comment
    @PostMapping
    @PreAuthorize("isAuthenticated()")  // Require login to create comments
    public ResponseEntity<CommentDTO> create(@RequestBody CommentDTO dto) {
        return ResponseEntity.ok(commentService.createComment(dto));
    }

    // Handle GET requests to retrieve a single comment by ID
    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to view comments
    public ResponseEntity<CommentDTO> get(@PathVariable Long id) {
        CommentDTO comment = commentService.getComment(id);
        if (comment == null) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        return ResponseEntity.ok(comment);
    }

    // Handle GET requests to retrieve all comments
    @GetMapping
    @PreAuthorize("isAuthenticated()")  // Require login to view comments
    public ResponseEntity<List<CommentDTO>> getAll() {
        return ResponseEntity.ok(commentService.getAllComment());
    }

    // Handle PUT requests to update an existing comment
    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to update comments
    public ResponseEntity<CommentDTO> update(@PathVariable Long id, @RequestBody CommentDTO dto) {
        return ResponseEntity.ok(commentService.updateComment(id, dto));
    }

    // Handle DELETE requests to remove a comment by ID
    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to delete comments
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
