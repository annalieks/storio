package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_data")
public class User {

    @Id @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @Column
    private String username;

    @Column
    private String password;

}
