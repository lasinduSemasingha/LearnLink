package com.learnlink.demo.interaction.service;

import java.util.List;

import com.learnlink.demo.interaction.dto.CommentDTO;

public interface CommentService {

    CommentDTO createComment(CommentDTO dto);
    CommentDTO getComment(Long id);
    List<CommentDTO> getAllComment();
    CommentDTO updateComment(Long id, CommentDTO dto);
    void deleteComment(Long id); // Method to delete a comment by its ID
    
}
