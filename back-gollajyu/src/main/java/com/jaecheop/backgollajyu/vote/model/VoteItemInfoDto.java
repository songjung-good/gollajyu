package com.jaecheop.backgollajyu.vote.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Builder
@ToString
@Getter
public class VoteItemInfoDto {
    private Long voteItemId;

    private String voteItemImgUrl;

    private String voteItemDesc;

    private Long price;

    private Long choiceCnt; // 아이템 선택 개수

    List<TagCount> tagCountList; // 각 태그별 선택 개수
}
