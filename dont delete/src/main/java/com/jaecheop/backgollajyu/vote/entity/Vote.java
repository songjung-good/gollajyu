package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long id;

    // FK
    @JoinColumn(name="memberId")
    @ManyToOne
    private Member member;

    private String title;

    private String description;

    private LocalDateTime createAt;

    private int code;

    private int codeType;

}
