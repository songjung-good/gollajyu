package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.Tag;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Map;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteItemResDto {
    private Long voteItemId;
    private Vote vote;
    private String voteItemImgUrl;
    private String voteItemDesc;
    private Long price; // tag1 = 30
    private Map<Tag, Long> voteResultCountResDtoList;
}
