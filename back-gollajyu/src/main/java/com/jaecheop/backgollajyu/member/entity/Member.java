package com.jaecheop.backgollajyu.member.entity;

import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.Gender;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
public class Member {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "type_id")
    private Type type;

    private String email;

    private String password;

    private String nickname;

    @Embedded
    private Birthday birthDay;
    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Long point;

    private String profileImgUrl;

    private LocalDateTime createAt;

    private LocalDateTime updateAt;

}
