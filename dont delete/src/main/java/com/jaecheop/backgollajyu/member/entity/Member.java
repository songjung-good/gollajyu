package com.jaecheop.backgollajyu.member.entity;

import com.jaecheop.backgollajyu.exception.NotEnoughPointException;
import com.jaecheop.backgollajyu.member.model.Birthday;
import com.jaecheop.backgollajyu.member.model.Gender;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long id;

    @ManyToOne
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

    public void minusPoint(Long amount) {
        if(point < amount) {
            // Exception
            throw new NotEnoughPointException("포인트가 충분하지 않습니다.");
        }
        else this.point -= amount;
    }

    public void plusPoint(Long amount){
        this.point += amount;
    }

}
