package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.member.model.VoteResDto;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VoteRepository extends JpaRepository<Vote, Long> {
    List<Vote> findByMemberId(Long memberId);

}
