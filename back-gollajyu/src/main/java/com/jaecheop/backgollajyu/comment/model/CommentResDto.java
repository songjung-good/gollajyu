package com.jaecheop.backgollajyu.comment.model;

import com.jaecheop.backgollajyu.vote.model.VoteResDto;
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

    private int commentId;
    private LocalDateTime commentCreateAt;
    private String commentDescription;
    private VoteResDto voteResDto;
}
