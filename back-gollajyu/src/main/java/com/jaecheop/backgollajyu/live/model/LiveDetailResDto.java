package com.jaecheop.backgollajyu.live.model;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveDetailResDto {
    private String title;
    private String nickName;
    private Long liveCount;
    private List<LiveVoteItemResDto> liveVoteItemDtoResList;
}