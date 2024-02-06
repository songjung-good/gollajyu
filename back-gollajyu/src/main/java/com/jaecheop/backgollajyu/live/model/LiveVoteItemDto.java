package com.jaecheop.backgollajyu.live.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LiveVoteItemDto {
    private String imgUrl;
    private String description;
    private Long count;
}
