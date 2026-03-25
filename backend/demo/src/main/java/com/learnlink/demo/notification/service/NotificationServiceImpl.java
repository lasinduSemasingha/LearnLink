package com.learnlink.demo.notification.service;

import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.entity.Notification;
import com.learnlink.demo.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService {

    @Autowired
    private NotificationRepository repository;

    private NotificationDTO mapToDTO(Notification notification) {
        NotificationDTO dto = new NotificationDTO();
        dto.setId(notification.getId());
        dto.setTitle(notification.getTitle());
        dto.setDescription(notification.getDescription());
        dto.setSender(notification.getSender());
        dto.setStatus(notification.getStatus());
        return dto;
    }

    private Notification mapToEntity(NotificationDTO dto) {
        Notification notification = new Notification();
        notification.setId(dto.getId());
        notification.setTitle(dto.getTitle());
        notification.setDescription(dto.getDescription());
        notification.setSender(dto.getSender());
        notification.setStatus(dto.getStatus());
        return notification;
    }

    @Override
    public NotificationDTO createNotification(NotificationDTO dto) {
        return mapToDTO(repository.save(mapToEntity(dto)));
    }

    @Override
    public NotificationDTO getNotification(Long id) {
        return repository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public List<NotificationDTO> getAllNotification() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public NotificationDTO updateNotification(Long id, NotificationDTO dto) {
        Notification notification = repository.findById(id).orElseThrow();
        notification.setTitle(dto.getTitle());
        notification.setDescription(dto.getDescription());
        notification.setSender(dto.getSender());
        notification.setStatus(dto.getStatus());
        return mapToDTO(repository.save(notification));
    }

    @Override
    public void deleteNotification(Long id) {
        repository.deleteById(id);
    }
}
