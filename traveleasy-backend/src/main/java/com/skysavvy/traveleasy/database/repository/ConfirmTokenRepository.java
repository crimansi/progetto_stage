package com.skysavvy.traveleasy.database.repository;

import com.skysavvy.traveleasy.model.user.ConfirmToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConfirmTokenRepository extends JpaRepository<ConfirmToken, Long> {
    ConfirmToken findByConfirmationToken(String confirmation);
}
