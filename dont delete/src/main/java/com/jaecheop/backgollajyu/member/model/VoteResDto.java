package com.jaecheop.backgollajyu.member.model;

import com.jaecheop.backgollajyu.member.entity.Member;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class VoteResDto {

    private Long voteId;
    private Member memberId;
    private String title;
    private String description;
    private LocalDateTime createAt;
    private int code;
    private int codeType;
//    private Long likesId;

    // Constructors, getters, setters...
}
