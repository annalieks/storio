package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table(name = "assignment")
public class Assignment {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id")
    private Course course;

    @Column
    private LocalDateTime deadline;

    @Column
    private int maxGrade;

    @Column
    private String title;

    @Column
    private String description;

    @OneToMany
    @JoinColumn(name = "id")
    private List<Submission> submissions;

}
