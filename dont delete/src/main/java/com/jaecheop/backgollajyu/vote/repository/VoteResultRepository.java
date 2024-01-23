package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.VoteResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteResultRepository extends JpaRepository<VoteResult, Long> {

    Optional<VoteResult> findByMemberIdAndVoteId(Long memberId, Long voteId);
}
