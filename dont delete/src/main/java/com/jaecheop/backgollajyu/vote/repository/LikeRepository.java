package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Like;
import com.jaecheop.backgollajyu.vote.entity.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LikeRepository extends JpaRepository<Like, Long> {
    List<Like> findByVote(Vote vote);
}
