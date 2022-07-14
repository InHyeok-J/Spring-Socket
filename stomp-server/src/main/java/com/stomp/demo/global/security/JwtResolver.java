package com.stomp.demo.global.security;

import com.stomp.demo.exception.AuthenticationFailException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class JwtResolver {

  private final String SECRET_KEY;

  public JwtResolver() {
    this.SECRET_KEY = "jwtsecretkey";
  }

  public Authentication getAuthentication(String token) {
    Claims claims = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();

    Collection<? extends GrantedAuthority> authorities = new ArrayList<>(
        List.of(new SimpleGrantedAuthority("USER")));
//    log.info((String)claims.get("memberId",Long.class));
    System.out.println(claims.get("userId"));
    System.out.println(claims.get("nickname"));
    return new UsernamePasswordAuthenticationToken(claims.get("userId"), "", authorities);
  }

  public boolean validationToken(String token) {
    try {
      Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token);
      return true;
    } catch (SecurityException | MalformedJwtException | SignatureException e) {
      log.error("잘못된 JWT 서명");
    } catch (ExpiredJwtException e) {
      log.error("만료된 JWT 토큰");
    } catch (UnsupportedJwtException e) {
      log.error("지원하지 않는 JWT 토큰");
    } catch (IllegalArgumentException e) {
      log.error("JWT 토큰이 잘못됨");
    }
    throw new AuthenticationFailException("인증실패");
  }

}