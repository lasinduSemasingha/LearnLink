package com.learnlink.demo.enrollment.controller;

import com.learnlink.demo.enrollment.dto.EnrollmentRequest;
import com.learnlink.demo.enrollment.dto.ProgressUpdateRequest;
import com.learnlink.demo.enrollment.entity.Enrollment;
import com.learnlink.demo.enrollment.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping("/add")
    public ResponseEntity<?> enrollStudent(@RequestBody EnrollmentRequest request) {
        try {
            Enrollment enrollment = enrollmentService.enrollStudent(request.getStudentId(), request.getCourseId());
            return ResponseEntity.ok(enrollment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentService.getAllEnrollments();
        return ResponseEntity.ok(enrollments);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getEnrollmentsByStudentId(@PathVariable String studentId) {
        List<Enrollment> enrollments = enrollmentService.getEnrollmentsByStudentId(studentId);
        return ResponseEntity.ok(enrollments);
    }

    @PatchMapping("/progress/{enrollmentId}")
    public ResponseEntity<Enrollment> updateProgress(@PathVariable Long enrollmentId,
                                                     @RequestBody ProgressUpdateRequest request) {
        Enrollment updated = enrollmentService.updateProgress(enrollmentId, request.getCompletionPercentage());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/unenroll/{enrollmentId}")
    public ResponseEntity<Void> unEnrollStudent(@PathVariable Long enrollmentId) {
        enrollmentService.unEnrollStudent(enrollmentId);
        return ResponseEntity.noContent().build();
    }
}
