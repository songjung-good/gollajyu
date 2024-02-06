package com.jaecheop.backgollajyu.live.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LiveStartReqDto {
    private Long memberId;
    private String liveTitle;
    private String liveImgUrl;
    List<LiveVoteItemDto> liveVoteItemDtoList;
}
