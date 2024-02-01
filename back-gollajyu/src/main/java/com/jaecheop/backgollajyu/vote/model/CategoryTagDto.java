package com.jaecheop.backgollajyu.vote.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Objects;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryTagDto {
    private Integer tagId; // Unique identifier for the tag
    private String category;
    private String tag;
    private Long count;

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        CategoryTagDto that = (CategoryTagDto) obj;
        return Objects.equals(tagId, that.tagId) &&
                Objects.equals(category, that.category) &&
                Objects.equals(tag, that.tag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagId, category, tag);
    }
}
