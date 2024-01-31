package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikesResDto {

    private Long memberId;

    private Long voteId;

    private boolean isLiked;

    public void updateIsLiked(boolean isLiked){
        this.isLiked = isLiked;
    }
}
