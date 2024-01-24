package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeDto {

    private Long likeId;
    private Long memberId;

}