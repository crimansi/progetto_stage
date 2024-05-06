package com.skysavvy.traveleasy.model.user;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user", uniqueConstraints = {@UniqueConstraint(columnNames = "username"),
@UniqueConstraint(columnNames = "email")})
@Getter @Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="first-name", nullable=false, length=45)
    private String firstName;
    @Column(name="last-name", nullable=false, length=45)
    private String lastName;
    @Column(nullable=false, length=45)
    private String username;
    @Column(nullable=false, length=45)
    @Email
    private String email;
    @Column(nullable=false, length=45)
    private String password;
    private boolean enabled;
    @Enumerated(value = EnumType.STRING)
    private Role role;

    public User(String firstName, String lastName, String username, String email, String password, boolean enabled, Role role) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.role = role;
    }
}
