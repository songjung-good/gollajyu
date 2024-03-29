package com.jaecheop.backgollajyu.vote.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Builder
@ToString
@Getter
public class VoteCloseInfoDto {
    private Long voteId;
    private Long memberId;
    private String title;
    private String description;
    private LocalDateTime createAt;

    private Long totalChoiceCnt;

    private List<VoteItemCloseInfoDto> voteItemList = new ArrayList<>();

    private Float percentDiff;

    // voteItemList update하는 메소드
    public void updateVoteItemList(List<VoteItemCloseInfoDto> voteItemCloseInfoDto) {
        this.voteItemList = voteItemCloseInfoDto;
    }

    public void updatePercentDiff() {
        this.percentDiff = Math.abs(voteItemList.get(0).getPercent() - voteItemList.get(1).getPercent());
    }


}
