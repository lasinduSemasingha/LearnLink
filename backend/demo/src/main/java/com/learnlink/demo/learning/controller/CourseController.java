package com.learnlink.demo.learning.controller;

import com.learnlink.demo.learning.dto.CourseDTO;
import com.learnlink.demo.learning.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin("*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping
    public CourseDTO create(@RequestBody CourseDTO dto) {
        return courseService.createCourse(dto);
    }

    @GetMapping("/{id}")
    public CourseDTO get(@PathVariable Long id) {
        return courseService.getCourse(id);
    }

    @GetMapping
    public List<CourseDTO> getAll() {
        return courseService.getAllCourses();
    }

    @PutMapping("/{id}")
    public CourseDTO update(@PathVariable Long id, @RequestBody CourseDTO dto) {
        return courseService.updateCourse(id, dto);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        courseService.deleteCourse(id);
    }
}
