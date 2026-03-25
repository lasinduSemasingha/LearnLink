package com.learnlink.demo.enrollment.dto;

public class EnrollmentRequest {
    private Long courseId;

    private String studentId;
    public Long getCourseId() {
        return courseId;
    }

    public String getStudentId() {
        return studentId;
    }

    public  void setStudentId(String studentId) {
        this.studentId = studentId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }
}