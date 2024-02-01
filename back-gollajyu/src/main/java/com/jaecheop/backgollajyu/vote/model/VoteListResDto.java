package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.Tag;
import lombok.*;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VoteListResDto {
    private String categoryName;
    private List<TagDto> tagList;
    private List<ListVoteDto> voteInfoList;

    public void updateVoteInfoList(List<ListVoteDto> voteInfoList) {
        this.voteInfoList = voteInfoList;
    }


}
