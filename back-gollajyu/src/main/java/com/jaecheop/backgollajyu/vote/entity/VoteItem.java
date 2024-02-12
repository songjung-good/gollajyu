package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.vote.model.VoteItemCloseInfoDto;
import com.jaecheop.backgollajyu.vote.model.VoteItemDto;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoteItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_item_id")
    private Long id;

    //FK
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vote_id")
    private Vote vote;

    private String voteItemImgUrl;

    private String voteItemDesc;

    private Long price;

    @OneToMany(mappedBy = "voteItem")
    List<VoteResult> voteResultList = new ArrayList<>();

    public void updateImgPath(String imgPath){
        this.voteItemImgUrl = imgPath;
    }

    public static VoteItemDto convertToDto(VoteItem vi){
        return VoteItemDto.builder()
                .id(vi.getId())
                .voteId(vi.getVote().getId())
                .voteItemImgUrl(vi.getVoteItemImgUrl())
                .voteItemDesc(vi.getVoteItemDesc())
                .price(vi.getPrice())
                .build();
    }


    public static VoteItemCloseInfoDto convertToVoteItemCloseInfoDto(VoteItem voteItem, Long voteTotalCnt){
        long itemTotalCnt = (long)voteItem.getVoteResultList().size();

        return VoteItemCloseInfoDto.builder()
                .voteItemId(voteItem.getId())
                .voteItemChoiceCnt(itemTotalCnt)
                .percent(((float)itemTotalCnt / voteTotalCnt) * 100)
                .build();
    }

}
