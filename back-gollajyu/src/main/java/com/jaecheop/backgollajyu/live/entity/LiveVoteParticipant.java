package com.jaecheop.backgollajyu.live.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LiveVoteParticipant {
    @Id
    @Column(name = "live_vote_participant_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "live_vote_item_id")
    private LiveVoteItem liveVoteItem;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
}