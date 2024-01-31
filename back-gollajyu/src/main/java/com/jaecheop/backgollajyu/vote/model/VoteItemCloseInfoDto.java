package com.jaecheop.backgollajyu.vote.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@ToString
@Getter
public class VoteItemCloseInfoDto {
    private Long voteItemId;
    private Long voteItemChoiceCnt;
    private float percent;
}
