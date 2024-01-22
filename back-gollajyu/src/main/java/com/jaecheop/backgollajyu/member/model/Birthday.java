package com.jaecheop.backgollajyu.member.model;

import jakarta.persistence.Embeddable;

@Embeddable
public class Birthday {

    private int year;
    private int month;
    private int day;
}
