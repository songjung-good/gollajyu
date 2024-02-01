package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;


@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RankDto {
    private List<VoteInfoDto> sortByLikes;

    private List<VoteInfoDto> sortByNew;

    private List<VoteInfoDto> sortByVoter;

    private List<VoteCloseInfoDto> sortByClose;
}
