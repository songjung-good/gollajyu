package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.member.entity.Member;
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
    private int code;
    private int codeType;
    private List<VoteItemResDto> voteItems;  // Include List of VoteItemDto

//    private Long likesId;

    // Constructors, getters, setters...
}
