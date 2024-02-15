package com.jaecheop.backgollajyu.vote.entity;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.model.VoteCloseInfoDto;
import com.jaecheop.backgollajyu.vote.model.VoteInfoDto;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "vote_id")
    private Long id;

    // FK
    @JoinColumn(name = "member_id")
    @ManyToOne
    private Member member;

    private String title;

    private String description;

    private LocalDateTime createAt;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @OneToMany(mappedBy = "vote")
    List<Likes> likesList = new ArrayList<>();

    @OneToMany(mappedBy = "vote")
    List<VoteItem> voteItemList = new ArrayList<>();

    @OneToMany(mappedBy = "vote")
    List<VoteResult> voteResultList = new ArrayList<>();

    public static VoteInfoDto convertToVoteInfoDto(Vote vote){
        return VoteInfoDto.builder()
                .voteId(vote.getId())
                .memberId(vote.getMember().getId())
                .title(vote.getTitle())
                .description(vote.getDescription())
                .createAt(vote.getCreateAt())
                .likesCnt((long)vote.getLikesList().size())
                .totalChoiceCnt((long)vote.getVoteResultList().size())
                .itemCnt(vote.getVoteItemList().size())
                .build();
    }

}
