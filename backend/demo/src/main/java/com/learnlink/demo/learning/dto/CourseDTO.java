package com.learnlink.demo.learning.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseDTO {
    private Long id;
    private String title;
    private String description;
    private String instructor;
}