package com.jaecheop.backgollajyu.vote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
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
