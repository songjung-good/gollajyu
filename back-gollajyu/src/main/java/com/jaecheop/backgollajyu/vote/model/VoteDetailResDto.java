package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.comment.entity.Comment;
import com.jaecheop.backgollajyu.comment.model.CommentResDto;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
@Builder
@ToString
@Getter
public class VoteDetailResDto {
    // 사용자 투표 참여 여부 및 투표한 아이템
    private Long chosenItem;

    // 투표 기본 정보
    private VoteInfoDto voteInfo;

    // 투표 아이템 리스트 정보
    private List<VoteItemInfoDto> voteItemList;

    // 댓글
    private List<CommentDto> commentList;


}
