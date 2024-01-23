package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.VoteItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VoteItemRepository extends JpaRepository<VoteItem, Long> {
    @Override
    Optional<VoteItem> findById(Long voteItemId);

    List<VoteItem> findAllByVoteId(Long voteId);
}
