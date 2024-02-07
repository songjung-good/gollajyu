package com.jaecheop.backgollajyu.live.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class LiveVoteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_vote_item_id")
    private Long id;

    @Column(name = "live_vote_item_img_url")
    private String imgUrl;

    @Column(name = "live_vote_item_description")
    private String description;

    @Column(name = "live_vote_item_count")
    private Long count;

    @ManyToOne
    @JoinColumn(name = "session_id")
    private Live live;
}
