package com.jaecheop.backgollajyu.member.model;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResDto implements Serializable {


    private Long memberId;

    private String email;

    private int typeId;

    private String nickname;

    private Birthday birthday;

    private String gender;

    private Long point;

    private String profileImgUrl;


}
