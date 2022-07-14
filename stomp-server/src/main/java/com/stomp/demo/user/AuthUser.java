package com.stomp.demo.user;

import java.util.Collection;
import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;

@Getter
public class AuthUser {
  private final Long userId;
  private final Collection<? extends GrantedAuthority> authority;

  public AuthUser(Long id, Collection<? extends GrantedAuthority> authority) {
    this.userId = id;
    this.authority = authority;
  }
}
