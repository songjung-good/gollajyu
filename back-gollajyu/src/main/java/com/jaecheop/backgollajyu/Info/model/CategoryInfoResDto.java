package com.jaecheop.backgollajyu.Info.model;

import com.jaecheop.backgollajyu.vote.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryInfoResDto {

    private Integer categoryId;

    private String categoryName;

    private Map<String, Long> myStatistic;

    public static CategoryInfoResDto buildFromStatistics(Category category, Map<String, Long> statistics) {
        return CategoryInfoResDto.builder()
                .categoryId(category.getId())
                .categoryName(category.getCategoryName())
                .myStatistic(statistics)
                .build();
    }
}
