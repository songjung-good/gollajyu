package com.jaecheop.backgollajyu.member.model;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class AddInfoReqDto {
    private String email;
    private String nickname;

    private int year;
    private int month;
    private int day;

    private String gender;
    private int typeId;
}
