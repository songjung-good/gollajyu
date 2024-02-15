package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.Vote;
import com.jaecheop.backgollajyu.vote.entity.VoteResult;
import com.jaecheop.backgollajyu.vote.repository.VoteResultRepository;
import lombok.*;

import java.util.List;
import java.util.Optional;

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

    // 멤버가 고른 해당 투표 투표 아이템
    private Long chosenItemId;

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

    public void updateChosenItem(Long chosenItem){
        this.chosenItemId = chosenItem;
    }



}
