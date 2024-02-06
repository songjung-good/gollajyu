package com.jaecheop.backgollajyu.member.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AddInfoResDto {
    private  String email;
    private  String nickname;
    private String password;

    private int year;
    private int month;
    private int day;

    private String gender;

    private int typeId;
}
