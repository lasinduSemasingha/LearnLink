package com.learnlink.demo.interaction.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.learnlink.demo.interaction.dto.CommentDTO;
import com.learnlink.demo.interaction.exception.ResourceNotFoundException;
import com.learnlink.demo.interaction.service.CommentService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/comments")
@CrossOrigin("*")
public class CommentController {
    
   @Autowired
    private CommentService commentService;

    // Handle POST requests to create a new comment
    @PostMapping
    public ResponseEntity<CommentDTO> create(@RequestBody CommentDTO dto) {
        // Call service to create a comment and return it with HTTP 200 OK
        return ResponseEntity.ok(commentService.createComment(dto));
    }

    // Handle GET requests to retrieve a single comment by ID
    @GetMapping("/{id}")
    public ResponseEntity<CommentDTO> get(@PathVariable Long id) {
        // Retrieve comment from service
        CommentDTO comment = commentService.getComment(id);
        // If comment not found, throw custom exception
        if (comment == null) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        // Return the found comment
        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<List<CommentDTO>> getAll() {
        return ResponseEntity.ok(commentService.getAllComment());
    }

    @PutMapping("/{id}")
    public ResponseEntity<CommentDTO> update(@PathVariable Long id, @RequestBody CommentDTO dto) {
        CommentDTO updated = commentService.updateComment(id, dto);
        if (updated == null) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        commentService.deleteComment(id);
        return ResponseEntity.noContent().build();
    }
}
