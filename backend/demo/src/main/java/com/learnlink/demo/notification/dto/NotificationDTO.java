package com.learnlink.demo.notification.dto;

import lombok.*;
//check notifi dto file
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class NotificationDTO {

    private Long id;
    private String title;
    private String description;
    private String sender;
}
