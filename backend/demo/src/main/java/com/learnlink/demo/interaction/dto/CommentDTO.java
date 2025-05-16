package com.learnlink.demo.interaction.dto;

public class CommentDTO {

    private Long id;           // Unique identifier for the comment
    private String postId;     // ID of the post this comment is related to
    private String comment;

    // No-args constructor
    public CommentDTO() {
    }

    // All-args constructor
    public CommentDTO(Long id, String postId, String comment) {
        this.id = id;
        this.postId = postId;
        this.comment = comment;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
