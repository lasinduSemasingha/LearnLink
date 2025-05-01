package com.learnlink.demo.notification.service;
import com.learnlink.demo.notification.dto.NotificationDTO;


import java.util.List;
//check crud full
//check create notification
public interface NotificationService {

    NotificationDTO createNotification(NotificationDTO dto);
    NotificationDTO getNotification(Long id);
    List<NotificationDTO> getAllNotification();
    NotificationDTO updateNotification(Long id, NotificationDTO dto);
    void deleteNotification(Long id);
}
//check view all notification
