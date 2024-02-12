package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.entity.Type;
import com.jaecheop.backgollajyu.member.model.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteResult {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="vote_result_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vote_id")
    private Vote vote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="vote_item_id")
    private VoteItem voteItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="member_id")
    private Member member;

    private Integer age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "type_id")
    private Type type;

    @Enumerated(EnumType.STRING)
    private Gender gender;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    private LocalDateTime createAt;

}
