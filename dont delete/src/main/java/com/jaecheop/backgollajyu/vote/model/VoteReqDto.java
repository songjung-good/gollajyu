package com.jaecheop.backgollajyu.vote.model;


import lombok.*;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteReqDto {

    // 단일 투표에 대한 기본 정보
    private String memberEmail;

    private String title;

    private String description;

    private int code;

    private int codeType;

    // 단일 투표에 들어간 투표 아이템들의 정보
    private List<VoteItemReqDto> voteItemList;


}
