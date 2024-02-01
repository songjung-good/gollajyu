package com.jaecheop.backgollajyu.Info.model;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class StatisticsSearchReqDto {

    private Long memberId;
//
//    private Long voteItemId;

    private Integer typeId;

    private Integer age;

    private String gender;

    private Integer categoryId;
}
