package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table
public class Tag {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column
    private String name;

}
