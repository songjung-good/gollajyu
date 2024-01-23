package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.member.entity.Member;
import com.jaecheop.backgollajyu.vote.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteResDto {

    private Long voteId;
    private Member memberId;
    private String title;
    private String description;
    private LocalDateTime createAt;
    private Category category; // 참조 어케 해야되지?
    private List<VoteItemResDto> voteItems;  // Include List of VoteItemDto
    private Long selectedItemId;
//    private Long likesId;

    // Constructors, getters, setters...
}
