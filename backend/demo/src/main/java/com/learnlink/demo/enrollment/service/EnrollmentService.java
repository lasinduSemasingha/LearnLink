package com.learnlink.demo.enrollment.service;

import com.learnlink.demo.enrollment.entity.Enrollment;
import com.learnlink.demo.enrollment.repository.EnrollmentRepository;
import com.learnlink.demo.notification.dto.NotificationDTO;
import com.learnlink.demo.notification.service.NotificationService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private NotificationService notificationService;

    public Enrollment enrollStudent(String studentId, Long courseId) {
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDate.now());
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByStudentId(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public Enrollment updateProgress(Long enrollmentId, Integer completionPercentage) {
        Enrollment enrollment = enrollmentRepository.findById(enrollmentId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        enrollment.setCompletionPercentage(completionPercentage);
        return enrollmentRepository.save(enrollment);
    }

    public void unEnrollStudent(Long enrollmentId) {
        enrollmentRepository.deleteById(enrollmentId);
    }


    @Transactional
    public Enrollment enrollStudentInCourse(String studentId, Long courseId) {
        // Create enrollment entity and set fields
        Enrollment enrollment = new Enrollment();
        enrollment.setStudentId(studentId);
        enrollment.setCourseId(courseId);
        enrollment.setEnrollmentDate(LocalDate.now());
        enrollment.setCompletionPercentage(0); // Assuming starting at 0%

        enrollment = enrollmentRepository.save(enrollment);

        // Create notification DTO
        NotificationDTO notificationDTO = new NotificationDTO();
        notificationDTO.setTitle("New Enrollment");
        notificationDTO.setDescription("Student with ID " + studentId + " enrolled in course ID " + courseId);
        notificationDTO.setSender("System");
        notificationDTO.setStatus(false);  // Assuming status is String in DTO

        notificationService.createNotification(notificationDTO);

        return enrollment;
    }
}