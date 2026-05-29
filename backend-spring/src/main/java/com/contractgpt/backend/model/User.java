package com.contractgpt.backend.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

import java.util.Date;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    private String email;
    private String password;
    private String name;
    private String company;
    private String jobTitle;
    private String profilePicture;

    private Date createdAt = new Date();
    private Date updatedAt = new Date();
}
