package com.learnlink.demo.enrollment.service;

import com.learnlink.demo.enrollment.entity.Enrollment;
import com.learnlink.demo.enrollment.repository.EnrollmentRepository;
import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private NotificationService notificationService;

    @Transactional
    public Enrollment enrollStudent(String studentId, Long courseId) {
        // Check if enrollment exists
        boolean alreadyEnrolled = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId).isPresent();
        if (alreadyEnrolled) {
            throw new IllegalArgumentException("Student " + studentId + " is already enrolled in course " + courseId);
        }

        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setCompletionPercentage(0);
        enrollment = enrollmentRepository.save(enrollment);

        // Create notification after enrollment
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setTitle("New Enrollment");
        notificationDTO.setDescription("Student " + studentId + " enrolled in course " + courseId);
        notificationDTO.setSender("System");
        notificationDTO.setStatus(true);

        notificationService.createNotification(notificationDTO);

        return enrollment;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByStudentId(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public Enrollment updateProgress(Long enrollmentId, Integer completionPercentage) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId).orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setCompletionPercentage(completionPercentage);
        return enrollmentRepository.save(enrollment);
    }

    public void unEnrollStudent(Long enrollmentId) {
        enrollmentRepository.deleteById(enrollmentId);
    }
}
