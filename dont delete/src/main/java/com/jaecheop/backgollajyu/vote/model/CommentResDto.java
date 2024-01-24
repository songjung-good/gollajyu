package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentResDto {

    private Long commentId;
    private LocalDateTime commentCreateAt;
    private String commentDescription;
    private VoteResDto voteResDto;
}
