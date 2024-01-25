package com.jaecheop.backgollajyu.vote.model;

import lombok.Getter;

@Getter
public class VoteDetailReqDto {

    private Long memberId;

    private Long voteId;

    // TODO:
    // 투표 상세에는 안쓰임!! 곧 삭제 예정
    // 나이, 성별, 소비 성향
//    private int ageRange;
//    private String gender;
//    private int typeId;
}
