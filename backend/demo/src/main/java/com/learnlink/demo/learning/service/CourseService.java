package com.learnlink.demo.learning.service;

import com.learnlink.demo.learning.dto.CourseDTO;

import java.util.List;

public interface CourseService {
    CourseDTO createCourse(CourseDTO dto);
    CourseDTO getCourse(Long id);
    List<CourseDTO> getAllCourses();
    CourseDTO updateCourse(Long id, CourseDTO dto);
    void deleteCourse(Long id);
}
