package com.skysavvy.traveleasy.database.repository;

import com.skysavvy.traveleasy.model.bookingFlight.Booked;
import com.skysavvy.traveleasy.model.user.User;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookedRepository extends JpaRepository<Booked, Long> {
    List<Booked> findAllByUser(User user);

    Optional<Booked> findBookedByUserAndId(User user, Long bookId);

    void deleteBookedById(Long bookId);

    List<Booked> findAllByUserOrderByDateAsc(User user);

    List<Booked> findAllByUserOrderByDateDesc(User user);

    @Query(value = "SELECT b FROM Booked b WHERE b.date >= :range AND b.user = :user")
    List<Booked> findAllFromRangeByUser(@Param("range") Date range, @Param("user") User user,  Sort sort);
}
