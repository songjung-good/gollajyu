package com.jaecheop.backgollajyu.vote.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Tag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    public String getCategoryTagName() {
        return category.getCategoryName() + " " + name;
    }
}
