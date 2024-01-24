package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Long id;

    @JoinColumn(name="member_id")
    @ManyToOne
    private Member member;

    @JoinColumn(name="vote_id")
    @ManyToOne
    private Vote vote;
}
