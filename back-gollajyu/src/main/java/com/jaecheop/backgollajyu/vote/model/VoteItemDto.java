package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteItemDto {
    private Long id;
    private Long voteId;
    private String voteItemImgUrl;
    private String voteItemDesc;
    private Long price;
}
