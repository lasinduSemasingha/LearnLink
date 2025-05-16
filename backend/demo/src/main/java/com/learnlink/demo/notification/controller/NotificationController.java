package com.learnlink.demo.notification.controller;

import com.learnlink.demo.learning.exception.ResourceNotFoundException;
import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

//import javax.management.Notification;
import java.util.List;
//add getall method
@RestController
@RequestMapping("/api/notification")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")

public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @PostMapping
    @PreAuthorize("isAuthenticated()")  // Require login to create posts
    public ResponseEntity<NotificationDTO> create(@RequestBody NotificationDTO dto) {
        return ResponseEntity.ok(notificationService.createNotification(dto));
    }

    @GetMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to create posts
    public ResponseEntity<NotificationDTO> get(@PathVariable Long id) {
        NotificationDTO notification = notificationService.getNotification(id);
        if (notification == null) {
            throw new ResourceNotFoundException("Notification not found with id: " + id);
        }
        return ResponseEntity.ok(notification);
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")  // Require login to create posts
    public ResponseEntity<List<NotificationDTO>> getAll() {
        return ResponseEntity.ok(notificationService.getAllNotification());
    }

    @PutMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to create posts
    public ResponseEntity<NotificationDTO> update(@PathVariable Long id, @RequestBody NotificationDTO dto) {
        NotificationDTO updated = notificationService.updateNotification(id, dto);
        if (updated == null) {
            throw new ResourceNotFoundException("Notification not found with id: " + id);
        }
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("isAuthenticated()")  // Require login to create posts
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        notificationService.deleteNotification(id);
        return ResponseEntity.noContent().build();
    }
}
