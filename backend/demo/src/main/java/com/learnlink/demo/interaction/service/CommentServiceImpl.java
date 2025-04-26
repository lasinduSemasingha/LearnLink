package com.learnlink.demo.interaction.service;


import com.learnlink.demo.interaction.dto.CommentDTO;
import com.learnlink.demo.interaction.entity.Comment;
import com.learnlink.demo.interaction.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository repository;

    private CommentDTO mapToDTO(Comment comment) {
        return CommentDTO.builder()
                .id(comment.getId())
                .postId(comment.getPostId())
                .comment(comment.getComment())
                .build();
    }

    private Comment mapToEntity(CommentDTO dto) {
        return Comment.builder()
                .id(dto.getId())
                .postId(dto.getPostId())
                .comment(dto.getComment())
                .build();
    }

    @Override
    public CommentDTO createComment(CommentDTO dto) {
        return mapToDTO(repository.save(mapToEntity(dto)));
    }

    @Override
    public CommentDTO getComment(Long id) {
        return repository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public List<CommentDTO> getAllComment() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public CommentDTO updateComment(Long id, CommentDTO dto) {
        Comment comment = repository.findById(id).orElseThrow();
        comment.setComment(dto.getComment());
        comment.setPostId(dto.getPostId());
        return mapToDTO(repository.save(comment));
    }

    @Override
    public void deleteComment(Long id) {
        repository.deleteById(id);
    }
}