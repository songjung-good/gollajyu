package com.jaecheop.backgollajyu.socialLogin;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Entity
@Builder
@AllArgsConstructor
public class OAuthAccount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Column
    private String picture;

//    @Enumerated(EnumType.STRING)
//    @Column(nullable = false)
//    private AccountRole role;

//    @Builder
//    public OAuthAccount(String name, String email, String picture, AccountRole role) {
//        this.name = name;
//        this.email = email;
//        this.picture = picture;
//        this.role = role;
//    }

    public OAuthAccount update(String name, String picture) {
        this.name = name;
        this.picture = picture;

        return this;
    }

//    public String getRoleKey() {
//        return this.role.getKey();
//    }
}