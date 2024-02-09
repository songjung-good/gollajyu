package com.jaecheop.backgollajyu.live.repository;

import com.jaecheop.backgollajyu.live.entity.LiveVoteParticipant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface LiveVoteParticipantRepository extends JpaRepository<LiveVoteParticipant, Long> {
    Optional<LiveVoteParticipant> findByMemberIdAndLiveVoteItemId(Long memberId, Long liveVoteItemId);

    void deleteByLiveVoteItemLiveId(Long liveId);

    List<LiveVoteParticipant> findByMemberId(Long memberId);
}
