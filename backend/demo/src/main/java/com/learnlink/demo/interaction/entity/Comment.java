package com.learnlink.demo.interaction.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "comment")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String postId;

    private String comment;

    // No-arg constructor
    public Comment() {}

    // All-arg constructor
    public Comment(Long id, String postId, String comment) {
        this.id = id;
        this.postId = postId;
        this.comment = comment;
    }

    // Getters
    public Long getId() {
        return id;
    }

    public String getPostId() {
        return postId;
    }

    public String getComment() {
        return comment;
    }

    // Setters
    public void setId(Long id) {
        this.id = id;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
