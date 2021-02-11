package com.backend.storio.dao;

import lombok.Data;

import javax.persistence.*;
import java.util.UUID;

@Data
@Entity
@Table(name = "user")
public class User {

    @Id @GeneratedValue
    @Column(name = "id")
    private final UUID id;

    @Column
    private final String username;

    @Column
    private final String password;

}
