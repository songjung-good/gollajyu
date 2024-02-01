package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SearchResDto {
    private String categoryName;
    private Long totalCnt;

    private List<ListVoteDto> voteList = new ArrayList<>();

    public void updateTotalCnt(Long totalCnt){
        this.totalCnt = totalCnt;
    }
    public void updateVoteList(List<ListVoteDto> voteList){
        this.voteList = voteList;
    }
}
