package com.jaecheop.backgollajyu.member.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
public class Type {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="type_id")
    private int id;


    private String typeName;

    private String typeImgUrl;

    private String typeDescription;

}
