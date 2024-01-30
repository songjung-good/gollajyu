package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.VoteResult;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@ToString
@Getter
public class ListVoteResultDto {
    private Long voteResultId;

    private Long memberId;

    private Long voteId;

    private int categoryId;


    public static ListVoteResultDto convertToDto(VoteResult voteResult){
        return ListVoteResultDto.builder()
                .voteResultId(voteResult.getId())
                .memberId(voteResult.getMember().getId())
                .voteId(voteResult.getVote().getId())
                .categoryId(voteResult.getCategory().getId())
                .build();
    }
}
