package com.jaecheop.backgollajyu.vote.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;

@Builder
@ToString
@Getter
public class VoteInfoDto {
    private Long memberId;
    private String title;
    private String description;

    private LocalDateTime createAt;

    private Long likesCnt;
    private Long totalChoiceCnt;
}
