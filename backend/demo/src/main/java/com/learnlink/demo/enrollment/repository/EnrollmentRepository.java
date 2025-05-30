package com.learnlink.demo.enrollment.repository;

import com.learnlink.demo.enrollment.entity.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    List<Enrollment> findByStudentId(String studentId);
    Optional<Enrollment> findByStudentIdAndCourseId(String studentId, Long courseId);
}