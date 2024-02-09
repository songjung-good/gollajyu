package com.jaecheop.backgollajyu.live.repository;

import com.jaecheop.backgollajyu.live.entity.Live;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LiveRepository extends JpaRepository<Live, Long> {

    // 회원이 존재하는지 확인
    boolean existsByMemberId(Long memberId);

    // 시청자 수가 많은 상위 3개 라이브 방송 조회
    List<Live> findTop3ByOrderByCountDesc();

    // 라이브 방송 전체 조회
    List<Live> findAll();
}

