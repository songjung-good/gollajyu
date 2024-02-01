package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor

public class ListVoteItemDto {
    private Long voteItemId;

    private String voteItemImgUrl;

    private String voteItemDesc;

    private Long price;
}
