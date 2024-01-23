package com.jaecheop.backgollajyu.vote.repository;

import com.jaecheop.backgollajyu.vote.entity.Category;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
