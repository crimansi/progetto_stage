package com.skysavvy.traveleasy.model.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.UUID;

@Entity
@Table(name="confirm_email")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConfirmToken {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "token_id")
    private Long id;
    @Column(name = "confirmation_token", nullable = false)
    private String confirmationToken;
    @Temporal(TemporalType.TIMESTAMP)
    private Date confirmationTime;
    @OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private User user;
    public ConfirmToken(User user) {
        this.user = user;
        confirmationTime = new Date();
        confirmationToken = UUID.randomUUID().toString();
    }

}
