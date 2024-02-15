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
public class LiveParticipant {
    @Id
    @Column(name = "live_participant_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}