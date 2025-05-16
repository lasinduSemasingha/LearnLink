package com.learnlink.demo.notification.dto;

public class NotificationDTO {

    private Long id;
    private String title;
    private String description;
    private String sender;
    private Boolean status;

    public NotificationDTO() {
    }

    public NotificationDTO(Long id, String title, String description, String sender, Boolean status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.sender = sender;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}
