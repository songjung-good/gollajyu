package com.jaecheop.backgollajyu.live.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class LiveVoteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "live_vote_item_id")
    private Long id;

    @Column(name = "live_vote_item_img_url" , nullable = true)
    private String imgUrl;

    @Column(name = "live_vote_item_description" , nullable = true)
    private String description;

    @Column(name = "live_vote_item_count")
    private Long count;

    @ManyToOne
    @JoinColumn(name = "live_id")
    private Live live;
}
