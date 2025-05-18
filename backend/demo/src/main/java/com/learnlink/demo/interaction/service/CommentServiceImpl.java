package com.learnlink.demo.interaction.service;

import com.learnlink.demo.interaction.dto.CommentDTO;
import com.learnlink.demo.interaction.entity.Comment;
import com.learnlink.demo.interaction.repository.CommentRepository;
import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepository repository;

    @Autowired
    private NotificationService notificationService; // Fix: Add this to call notificationService

    private CommentDTO mapToDTO(Comment comment) {
        CommentDTO dto = new CommentDTO();
        dto.setId(comment.getId());
        dto.setPostId(comment.getPostId());
        dto.setComment(comment.getComment());
        return dto;
    }

    private Comment mapToEntity(CommentDTO dto) {
        Comment comment = new Comment();
        comment.setId(dto.getId());
        comment.setPostId(dto.getPostId());
        comment.setComment(dto.getComment());
        return comment;
    }

    @Transactional
    public CommentDTO createComment(CommentDTO dto) {
        Comment savedComment = repository.save(mapToEntity(dto));

        // Create notification after comment creation
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setTitle("New Comment");
        notificationDTO.setDescription("A new comment was added to post " + dto.getPostId());
        notificationDTO.setSender("System");
        notificationDTO.setStatus(false);

        notificationService.createNotification(notificationDTO);

        return mapToDTO(savedComment);
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
