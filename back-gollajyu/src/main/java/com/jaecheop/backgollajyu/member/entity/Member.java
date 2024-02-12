package com.jaecheop.backgollajyu.member.entity;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.member.model.AddInfoReqDto;
import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Member implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
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


    // 소셜 로그인으로 가입한 사용자인지 여부 확인을 위한 변수
    private String provider;
    private String providerId;


    private LocalDateTime createAt;

    private LocalDateTime updateAt;

    public void minusPoint(Long amount) {
        if (point < amount) {
            // Exception
            throw new NotEnoughPointException("포인트가 충분하지 않습니다.");
        } else this.point -= amount;
    }

    public void plusPoint(Long amount) {
        this.point += amount;
    }

    public void update(AddInfoReqDto addInfoReqDto, Type type) {
        this.updateAt = LocalDateTime.now();
        this.birthDay = Birthday.builder()
                .year(addInfoReqDto.getYear())
                .month(addInfoReqDto.getMonth())
                .day(addInfoReqDto.getDay())
                .build();
        this.gender = Gender.valueOf(addInfoReqDto.getGender());
        this.type = type;
        this.nickname = addInfoReqDto.getNickname();
        this.profileImgUrl = String.valueOf(type.getId());
    }
}
