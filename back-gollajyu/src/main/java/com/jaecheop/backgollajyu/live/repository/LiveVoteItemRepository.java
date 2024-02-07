package com.jaecheop.backgollajyu.live.repository;

import com.jaecheop.backgollajyu.live.entity.LiveVoteItem;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
@Repository
public interface LiveVoteItemRepository extends JpaRepository<LiveVoteItem, Long> {

    @Transactional
    void deleteByLiveId(Long sessionId);
}

