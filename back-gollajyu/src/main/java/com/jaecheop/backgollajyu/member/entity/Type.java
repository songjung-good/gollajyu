package com.jaecheop.backgollajyu.member.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;

@Entity
@Getter
public class Type implements Serializable {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="type_id")
    private int id;


    private String typeName;

    private String typeImgUrl;

    private String typeDescription;

}
