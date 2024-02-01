package com.jaecheop.backgollajyu.comment.model;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CommentLikesReqDto {

    private Long memberId;

    private Long commentId;
}
