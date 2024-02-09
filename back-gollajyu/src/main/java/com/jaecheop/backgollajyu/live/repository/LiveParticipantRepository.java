package com.jaecheop.backgollajyu.live.repository;

import com.jaecheop.backgollajyu.live.entity.LiveParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LiveParticipantRepository extends JpaRepository<LiveParticipant, Long> {
    Optional<LiveParticipant> findByLiveIdAndMemberId(Long liveId, Long memberId);

    boolean existsByMemberIdAndLiveId(Long memberId, Long liveId);
}