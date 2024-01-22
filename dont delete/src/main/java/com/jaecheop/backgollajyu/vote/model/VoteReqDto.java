package com.jaecheop.backgollajyu.vote.model;


import lombok.*;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
public class VoteReqDto {

    private int memberId;

    private String title;

    private String description;

    private int code;

    private int codeType;
}
