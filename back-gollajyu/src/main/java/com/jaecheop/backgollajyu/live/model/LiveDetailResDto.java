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
    private List<LiveVoteItemResDto> liveVoteItemDtoResList;
}