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
        return CourseDTO.builder()
                .id(course.getId())
                .title(course.getTitle())
                .description(course.getDescription())
                .instructor(course.getInstructor())
                .build();
    }

    private Course mapToEntity(CourseDTO dto) {
        return Course.builder()
                .id(dto.getId())
                .title(dto.getTitle())
                .description(dto.getDescription())
                .instructor(dto.getInstructor())
                .build();
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
