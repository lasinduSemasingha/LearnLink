package com.learnlink.demo.interaction.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentDTO {

    private Long id; // Unique identifier for the comment
    private String postId;
    private String comment;
      
}
