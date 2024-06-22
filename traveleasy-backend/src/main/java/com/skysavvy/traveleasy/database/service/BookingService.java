package com.skysavvy.traveleasy.database.service;

import com.skysavvy.traveleasy.configuration.security.jwt.JwtUtils;
import com.skysavvy.traveleasy.database.repository.*;
import com.skysavvy.traveleasy.model.bookingFlight.Booked;
import com.skysavvy.traveleasy.model.bookingFlight.Booking;
import com.skysavvy.traveleasy.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    BookedRepository bookedRepository;
    @Autowired
    JwtUtils jwtUtils;
    @Autowired
    UserRepository userRepository;
    public void saveBooking(Booking booking, String tokenUser) {
        User user = findUser(tokenUser);
        Date today = new Date();
        Booked booked = new Booked();
        booked.setBooking(booking);
        booked.setUser(user);
        booked.setDate(today);
        bookedRepository.save(booked);
    }
    public List<Booked> getAllPublicBookings(String tokenUser, String sort) {
        User user = findUser(tokenUser);
        if(sort.isEmpty())
            return bookedRepository.findAllByUser(user);
        else{
            Sort sortBooked = Sort.by(Sort.Direction.fromString(sort), "date");
            return bookedRepository.findAllByUser(user, sortBooked);
        }
        /*if ("asc".equalsIgnoreCase(sort)) {
            return bookedRepository.findAllByUserOrderByDateAsc(user);
        } else if ("desc".equalsIgnoreCase(sort)) {
            return bookedRepository.findAllByUserOrderByDateDesc(user);
        } else {
            return bookedRepository.findAllByUser(user);
        }*/
    }

    @Transactional
    public void deleteBooking(Long bookingId) {
        bookedRepository.deleteBookedById(bookingId);
    }

    public List<Booked> getBookingsFromRange(String tokenUser, String range, String sort) {
        User user = findUser(tokenUser);
        Sort sortBooked = Sort.by(Sort.Direction.fromString(sort), "date");
        if("oneWeekAgo".equalsIgnoreCase(range)) {
            Date oneWeekAgo = getDateWithOffset(-1, Calendar.WEEK_OF_YEAR);
            return bookedRepository.findAllFromRangeByUser(oneWeekAgo, user, sortBooked);
        } else if("oneMonthAgo".equalsIgnoreCase(range)) {
            Date oneMonthAgo = getDateWithOffset(-1, Calendar.MONTH);
            return bookedRepository.findAllFromRangeByUser(oneMonthAgo, user, sortBooked);
        } else if("oneYearAgo".equalsIgnoreCase(range)) {
            Date oneYearAgo = getDateWithOffset(-1, Calendar.YEAR);
            return bookedRepository.findAllFromRangeByUser(oneYearAgo, user, sortBooked);
        } else
            return getAllPublicBookings(tokenUser, sort);
    }

    private Date getDateWithOffset(int offset, int field) {
        Calendar calendar = Calendar.getInstance();
        calendar.add(field, offset);
        return calendar.getTime();
    }

    private User findUser(String tokenUser){
        if(userRepository.findByUsername(jwtUtils.getUsernameFromToken(tokenUser)).isPresent())
            return  userRepository.findByUsername(jwtUtils.getUsernameFromToken(tokenUser)).get();
        return null;
    }
}
