package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.Category;
import com.jaecheop.backgollajyu.vote.entity.Tag;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import lombok.*;

import java.util.List;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ListVoteDto {
    private Long voteId;
    private String voteTitle;
    private int categoryId;
    private String categoryName;
    private List<TagDto> tagList;
    private Long likesCnt;
    private List<ListVoteItemDto> voteItemList;

    // 멤버의 해당 투표 좋아요 여부
    private boolean isLiked;

    public void updateVoteItemList(List<ListVoteItemDto> voteItemList) {
        this.voteItemList = voteItemList;
    }

    public void updateTagList(List<TagDto> tagList){
        this.tagList = tagList;
    }
    public static ListVoteDto convertToDto(Vote vote){
        return ListVoteDto.builder()
                .voteId(vote.getId())
                .voteTitle(vote.getTitle())
                .categoryId(vote.getCategory().getId())
                .categoryName(vote.getCategory().getCategoryName())
                .likesCnt((long)vote.getLikesList().size())
                .build();
    }

    public void updateIsLiked(){
        this.isLiked = true;
    }

}
