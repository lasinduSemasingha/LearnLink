package com.learnlink.demo.learning.repository;

import com.learnlink.demo.learning.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}