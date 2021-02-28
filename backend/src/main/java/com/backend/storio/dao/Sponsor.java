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
public class Sponsor {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column
    private String name;

    @Column
    private String description;

    @ManyToMany(mappedBy = "sponsors", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Course> courses;

}
