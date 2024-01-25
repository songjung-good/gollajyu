package com.jaecheop.backgollajyu.member.model;

import lombok.Getter;

@Getter
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
