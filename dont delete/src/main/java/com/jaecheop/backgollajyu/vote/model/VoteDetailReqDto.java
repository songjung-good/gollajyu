package com.jaecheop.backgollajyu.vote.model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class VoteDetailReqDto {

    private Long memberId;

    private Long voteId;

    // TODO
    // 나이, 성별, 소비 성향
    private Filter filter;
}
