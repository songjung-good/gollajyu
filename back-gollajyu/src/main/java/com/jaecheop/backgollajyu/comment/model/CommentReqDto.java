package com.jaecheop.backgollajyu.comment.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentReqDto {

    private Long voteId;

    private Long memberId;

    private Long voteItemId;

    private String commentDesc;

    private Long commentMentionId;
}
