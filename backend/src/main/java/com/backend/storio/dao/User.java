package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "user_data")
public class User {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private String firstName;

    @Column
    private String lastName;

    @Column
    private String avatar;

    @ManyToMany(mappedBy = "students", fetch = FetchType.LAZY)
    private List<Course> studentCourses;

    @OneToMany(mappedBy = "creator", fetch = FetchType.LAZY)
    private List<Course> teacherCourses;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
    private List<Certificate> certificates;

}
