package com.jaecheop.backgollajyu.member.model;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Birthday {
    private int year;
    private int month;
    private int day;
}
