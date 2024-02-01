package com.jaecheop.backgollajyu.vote.model;


import com.jaecheop.backgollajyu.vote.entity.Tag;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class TagDto {
    private int tagId;
    private String tagName;

    public static TagDto convertToDto(Tag tag){
        return TagDto.builder()
                .tagId(tag.getId())
                .tagName(tag.getName())
                .build();
    }
}
