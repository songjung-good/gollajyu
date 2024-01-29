package com.jaecheop.backgollajyu.member.repostory;

import com.jaecheop.backgollajyu.member.entity.Type;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeRepository extends JpaRepository<Type, Integer> {
}
