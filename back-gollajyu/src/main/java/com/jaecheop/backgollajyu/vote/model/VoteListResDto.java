package com.jaecheop.backgollajyu.vote.model;

import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteListResDto {
    private int lastPageNo;
    private String categoryName;
    private List<TagDto> tagList;
    private List<ListVoteDto> voteInfoList;

    public void updateVoteInfoList(List<ListVoteDto> voteInfoList) {
        this.voteInfoList = voteInfoList;
    }
    public void updateLastPageNo(int lastPageNo) {
        this.lastPageNo = lastPageNo;
    }


}
