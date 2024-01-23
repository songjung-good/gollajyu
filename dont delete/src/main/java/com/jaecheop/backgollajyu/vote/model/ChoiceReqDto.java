package com.jaecheop.backgollajyu.vote.model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class ChoiceReqDto {
    private Long memberId;

    private Long voteId;
    private Long voteItemId;
}
