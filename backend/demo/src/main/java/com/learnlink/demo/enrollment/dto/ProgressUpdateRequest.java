package com.learnlink.demo.enrollment.dto;

public class ProgressUpdateRequest {
    private Integer completionPercentage;

    public ProgressUpdateRequest() {
    }

    public ProgressUpdateRequest(Integer completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public Integer getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(Integer completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
}
