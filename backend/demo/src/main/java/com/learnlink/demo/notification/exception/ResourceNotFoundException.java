package com.learnlink.demo.notification.exception;
//message notify
public class ResourceNotFoundException extends RuntimeException{
    public ResourceNotFoundException(String message) {
        super(message);
    }
}
