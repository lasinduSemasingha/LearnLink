package com.learnlink.demo.notification.service;
import com.learnlink.demo.learning.dto.CourseDTO;
import com.learnlink.demo.notification.dto.NotificationDTO;


import java.util.List;

public interface NotificationService {

    NotificationDTO createNotification(NotificationDTO dto);
    NotificationDTO getNotification(Long id);
    List<NotificationDTO> getAllNotification();
    NotificationDTO updateNotification(Long id, NotificationDTO dto);
    void deleteNotification(Long id);
}
