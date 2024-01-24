package com.jaecheop.backgollajyu.comment.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private int id;

    @JoinColumn(name="vote_id")
    @ManyToOne
    private Vote vote;

    @JoinColumn(name="member_id")
    @ManyToOne
    private Member member;

    @JoinColumn(name="vote_item_id")
    @ManyToOne
    private VoteItem voteItem;

    private String commentDescription;

    private Timestamp commentCreateAt;

    private Boolean status;

    private Long commentMentionId;

}
