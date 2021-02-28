package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;
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
    @JoinColumn(name = "user_id")
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
    private Date createdAt;

    @ManyToMany(fetch = FetchType.LAZY)
    List<User> students;

    @ManyToMany(mappedBy = "courses", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Tag> tags;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Assignment> teacherCourses;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Certificate> certificates;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Material> materials;

    @OneToMany(mappedBy = "course", fetch = FetchType.LAZY)
    private List<Post> posts;

    @ManyToMany(fetch = FetchType.LAZY)
    private List<Sponsor> sponsors;

}

