package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table
public class Submission {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "id")
    private User author;

    @Column
    private LocalDateTime submittedAt;

    @Column
    private int grade;

    @Column
    private boolean submitted;

    @Column
    private String text;

}
