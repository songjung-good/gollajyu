package com.jaecheop.backgollajyu.live.model;

import lombok.*;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class VoteRequestDto {
    private Long memberId;
    private Long liveId;
    private Long liveVoteItemId;
}
