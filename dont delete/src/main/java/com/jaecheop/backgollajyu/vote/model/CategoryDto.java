package com.jaecheop.backgollajyu.vote.model;

import com.jaecheop.backgollajyu.vote.entity.Tag;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

    private int categoryId;
    private String categoryName;
    private List<Tag> tags;
}
