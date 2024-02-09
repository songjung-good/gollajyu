    package com.jaecheop.backgollajyu.live.entity;

    import com.jaecheop.backgollajyu.member.entity.Member;
    import jakarta.persistence.*;
    import lombok.*;

    @Entity
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    @Getter
    @Setter
    @ToString
    public class Live {
        @Id
        @Column(name = "live_id")
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @Column(name = "session_id")
        private String sessionId;

        @JoinColumn(name = "member_id")
        @ManyToOne
        private Member member;

        @Column(name = "live_title")
        private String title;

        @Column(name = "live_count")
        private Long count;

        @Column(name = "live_img_url")
        private String imgUrl;
    }
