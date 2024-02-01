package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.member.model.MemberDto;
import com.jaecheop.backgollajyu.vote.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoteResDto {

    private Long voteId;
    private MemberDto memberDto;
    private String title;
    private String description;
    private LocalDateTime createAt;
    private Long selectedItemId;

    private List<LikeDto> likes;
    private CategoryDto categoryDto; // 참조 어케 해야되지?
    private List<VoteItemResDto> voteItems;  // Include List of VoteItemDto


    // Constructors, getters, setters...
}


