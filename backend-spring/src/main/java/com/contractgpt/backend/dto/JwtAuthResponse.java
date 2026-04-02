package com.contractgpt.backend.dto;

import com.contractgpt.backend.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtAuthResponse {
    private boolean success;
    private String message;
    private User user;
    private String token;
}
