package com.learnlink.demo.post.exeption;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) { super(message);}
}
