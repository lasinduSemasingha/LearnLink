package com.learnlink.demo.learning.dto;

public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String instructor;

    // No-arg constructor
    public CourseDTO() {
    }

    // All-arg constructor
    public CourseDTO(Long id, String title, String description, String instructor) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructor = instructor;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getInstructor() {
        return instructor;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setInstructor(String instructor) {
        this.instructor = instructor;
    }

    // Builder Pattern Implementation
    public static class Builder {
        private Long id;
        private String title;
        private String description;
        private String instructor;

        public Builder() {
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder title(String title) {
            this.title = title;
            return this;
        }

        public Builder description(String description) {
            this.description = description;
            return this;
        }

        public Builder instructor(String instructor) {
            this.instructor = instructor;
            return this;
        }

        public CourseDTO build() {
            return new CourseDTO(id, title, description, instructor);
        }
    }

    // Static method to get Builder instance
    public static Builder builder() {
        return new Builder();
    }
}
