package com.learnlink.demo.interaction.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment {

     @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 
    private String postId;
    private String comment;
    
}
