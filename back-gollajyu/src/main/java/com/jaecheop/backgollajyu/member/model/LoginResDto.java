package com.jaecheop.backgollajyu.member.model;

import lombok.*;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResDto {


    private Long memberId;

    private String email;

    private String typeName;

    private String nickname;

    private Birthday birthday;

    private String gender;

    private Long point;

    private String profileImgUrl;


}
