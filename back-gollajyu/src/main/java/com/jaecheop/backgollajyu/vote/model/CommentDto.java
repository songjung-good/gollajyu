package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.comment.entity.Comment;
import com.jaecheop.backgollajyu.comment.entity.CommentLikes;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CommentDto {
    private Long commentId;

    // 사용자 정보
    private boolean isLiked;

    // 작성자 정보
    private Long memberId;

    private String memberNickname;

    // 투표 아이템 정보
    private Long voteItemId;

    // 댓글 정보
    private String commentDesc;

    private LocalDateTime createAt;

    private boolean isDeleted;

    private Long commentMentionId;

    private int commentLikesCnt;

    public static CommentDto convertToDto(Comment comment, Long memberId) {
        // 아규먼트로 받은 사용자가 해당 댓글에 좋아요를 했는지 여부 찾기
        List<CommentLikes> commentLikesList = comment.getCommentLikes();
        boolean isLiked = false;
        for (CommentLikes commentLike : commentLikesList) {
            if (Objects.equals(commentLike.getMember().getId(), memberId)) {
                isLiked = true;
                break;
            }
        }
        return CommentDto.builder()
                .isLiked(isLiked)
                .commentId(comment.getId())
                .memberId(comment.getMember().getId())
                .memberNickname(comment.getMember().getNickname())
                .voteItemId(comment.getVoteItem().getId())
                .commentDesc(comment.getCommentDesc())
                .createAt(comment.getCreateAt())
                .isDeleted(comment.isDeleted())
                .commentMentionId(comment.getCommentMentionId())
                .commentLikesCnt(comment.getCommentLikes().size())
                .build();
    }
}
