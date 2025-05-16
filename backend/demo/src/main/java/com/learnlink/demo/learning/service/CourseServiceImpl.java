package com.learnlink.demo.learning.service;

import com.learnlink.demo.learning.dto.CourseDTO;
import com.learnlink.demo.learning.entity.Course;
import com.learnlink.demo.learning.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository repository;

    private CourseDTO mapToDTO(Course course) {
        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setTitle(course.getTitle());
        dto.setDescription(course.getDescription());
        dto.setInstructor(course.getInstructor());
        return dto;
    }

    private Course mapToEntity(CourseDTO dto) {
        Course course = new Course();
        course.setId(dto.getId());
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setInstructor(dto.getInstructor());
        return course;
    }

    @Override
    public CourseDTO createCourse(CourseDTO dto) {
        return mapToDTO(repository.save(mapToEntity(dto)));
    }

    @Override
    public CourseDTO getCourse(Long id) {
        return repository.findById(id).map(this::mapToDTO).orElse(null);
    }

    @Override
    public List<CourseDTO> getAllCourses() {
        return repository.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public CourseDTO updateCourse(Long id, CourseDTO dto) {
        Course course = repository.findById(id).orElseThrow();
        course.setTitle(dto.getTitle());
        course.setDescription(dto.getDescription());
        course.setInstructor(dto.getInstructor());
        return mapToDTO(repository.save(course));
    }

    @Override
    public void deleteCourse(Long id) {
        repository.deleteById(id);
    }
}
