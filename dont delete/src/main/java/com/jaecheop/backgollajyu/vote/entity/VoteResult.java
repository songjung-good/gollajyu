package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.entity.Type;
import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.Gender;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteResult {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="vote_result_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name="vote_id")
    private Vote vote;

    @ManyToOne
    @JoinColumn(name="vote_item_id")
    private VoteItem voteItem;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    @JoinColumn(name="member_id")
    private Member member;

    private int age;

    @OneToOne
    @JoinColumn(name = "type_id")
    private Type type;

    @Enumerated(EnumType.STRING)
    private Gender gender;


    @OneToOne
    @JoinColumn(name = "tag_id")
    private Tag tag;


}
