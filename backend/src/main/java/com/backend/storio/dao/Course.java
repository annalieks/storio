package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table
public class Course {
    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id")
    private User creator;

    @Column
    private String name;

    @Column
    private String description;

    @Column
    private LocalDateTime finishedAt;

    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    @Column
    private LocalDateTime createdAt;

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "user_data",
            joinColumns = {@JoinColumn(name = "id")},
            inverseJoinColumns = {@JoinColumn(name = "id")})
    List<User> students;

    @ManyToMany(mappedBy = "courses")
    private List<Tag> tags;

    @OneToMany(mappedBy = "course")
    private List<Assignment> teacherCourses;

}

