package com.learnlink.demo.notification.service;
import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.entity.Notification;
import com.learnlink.demo.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

//check fix import files
@Service
public class NotificationServiceImpl implements NotificationService {

        @Autowired
        private NotificationRepository repository;

        private NotificationDTO mapToDTO(Notification notification) {
            return NotificationDTO.builder()
                    .id(notification.getId())
                    .title(notification.getTitle())
                    .description(notification.getDescription())
                    .sender(notification.getSender())
                    .build();
        }

        private Notification mapToEntity(NotificationDTO dto) {
            return Notification.builder()
                    .id(dto.getId())
                    .title(dto.getTitle())
                    .description(dto.getDescription())
                    .sender(dto.getSender())
                    .build();
        }
        //createNotification
        @Override
        public NotificationDTO createNotification(NotificationDTO dto) {
            return mapToDTO(repository.save(mapToEntity(dto)));
        }
        //getNotification
        @Override
        public NotificationDTO getNotification(Long id) {
            return repository.findById(id).map(this::mapToDTO).orElse(null);
        }
        //getAllNotification
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
            return mapToDTO(repository.save(notification));
        }

        @Override
        public void deleteNotification(Long id) {
            repository.deleteById(id);
        }


}
