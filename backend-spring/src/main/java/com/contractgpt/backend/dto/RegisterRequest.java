package com.contractgpt.backend.dto;

import lombok.Data;

@Data
public class RegisterRequest {
    private String email;
    private String password;
    private String name;
    private String company;
    private String jobTitle;
}
