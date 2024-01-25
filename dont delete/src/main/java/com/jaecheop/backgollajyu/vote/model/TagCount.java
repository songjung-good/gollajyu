package com.jaecheop.backgollajyu.vote.model;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Builder
@ToString
@Getter
public class TagCount {
    private int tagId;
    private String tagName;
    private Long count;
}
