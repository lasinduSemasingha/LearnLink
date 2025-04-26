package com.learnlink.demo.notification.repository;

import com.learnlink.demo.learning.entity.Course;
import com.learnlink.demo.notification.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
