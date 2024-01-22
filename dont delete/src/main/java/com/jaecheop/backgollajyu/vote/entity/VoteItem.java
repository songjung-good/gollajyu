package com.jaecheop.backgollajyu.vote.entity;

import jakarta.persistence.*;

@Entity
public class VoteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_item_id")
    private Long id;

    //FK
    @ManyToOne
    @JoinColumn(name = "vote_id")
    private Vote vote;

    private String voteItemImgUrl;

    private String voteItemDesc;

    private Long price;
}
