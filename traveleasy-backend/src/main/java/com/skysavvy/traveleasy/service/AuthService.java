package com.skysavvy.traveleasy.service;

import com.skysavvy.traveleasy.model.user.ConfirmToken;
import com.skysavvy.traveleasy.model.user.CostumUserDetails;
import com.skysavvy.traveleasy.model.user.User;
import com.skysavvy.traveleasy.payload.request.LoginRequest;
import com.skysavvy.traveleasy.payload.request.SignUpRequest;
import com.skysavvy.traveleasy.payload.response.AuthResponse;
import com.skysavvy.traveleasy.repository.ConfirmTokenRepository;
import com.skysavvy.traveleasy.repository.UserRepository;
import com.skysavvy.traveleasy.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;
    @Autowired
    private ConfirmTokenRepository confirmTokenRepository;
    @Autowired
    private EmailService emailService;

    public ResponseEntity<?> signUp(SignUpRequest user) {
        if(userRepository.existsByUsername(user.getUsername())) {
            return ResponseEntity.badRequest().body("Error: Username is already in use!");
        }if(userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body("Error: Email is already in use!");
        }
        User newUser = new User();
        newUser.setPassword(passwordEncoder.encode(user.getPassword()));
        newUser.setUsername(user.getUsername());
        newUser.setEmail(user.getEmail());
        newUser.setFirstName(user.getFirstName());
        newUser.setLastName(user.getLastName());
        newUser.setRole(user.getRole());
        newUser.setEnabled(true);
        userRepository.save(newUser);

        ConfirmToken confirmToken = new ConfirmToken(newUser);
        confirmTokenRepository.save(confirmToken);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setTo(user.getEmail());
        mailMessage.setSubject("Complete Registration!");
        mailMessage.setText("To confirm your account, please click here : "
                +"http://localhost:8085/confirm-account?token="+confirmToken.getConfirmationToken());
        emailService.sendEmail(mailMessage);
        System.out.println("Confirmation Token: " + confirmToken.getConfirmationToken());
        return ResponseEntity.ok("Verify email by the link sent on your email address");
    }

    public ResponseEntity<?> login(LoginRequest loginRequest, Authentication auth) {
        String token = jwtUtils.generateToken(auth);
        CostumUserDetails userDetails = (CostumUserDetails) auth.getPrincipal();
        if(userRepository.findByUsername(userDetails.getUsername()).isPresent()) {
            User user = userRepository.findByUsername(userDetails.getUsername()).get();
            return ResponseEntity.ok(new AuthResponse(token, user.getUsername(), user.getEmail(), user.getFirstName(), user.getLastName()));
        }
        return ResponseEntity.badRequest().body("Error: Couldn't login");
    }


    /*public ResponseEntity<?> confirmEmail(String confirmationToken) {
        ConfirmToken token = confirmTokenRepository.findByConfirmationToken(confirmationToken);
        if(token != null) {
            if(userRepository.findByEmail(token.getUser().getEmail()).isPresent()) {
                User user = userRepository.findByEmail(token.getUser().getEmail()).get();
                user.setEnabled(true);
                userRepository.save(user);
                return ResponseEntity.ok("Email verified successfully!");
            }
        }
        return ResponseEntity.badRequest().body("Error: Couldn't verify email");
    }*/


}
