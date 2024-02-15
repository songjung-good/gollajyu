package com.jaecheop.backgollajyu.member.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpReqDto {
    private String email;

    private String nickname;

    private String password;

    private String verifyPassword;

    private int year;
    private int month;
    private int day;

    private String gender;

    private int typeId;
}
