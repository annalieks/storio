package com.backend.storio.dao;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@Entity
@Table
public class ToDo {

    @Id
    @GeneratedValue
    @Column
    private UUID id;

    @Column
    private String text;

    @Column
    private boolean done;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "author_id")
    private User author;

}
