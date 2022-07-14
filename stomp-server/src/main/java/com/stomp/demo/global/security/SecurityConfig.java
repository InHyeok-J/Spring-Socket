package com.stomp.demo.global.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


  private final JwtResolver jwtResolver;
  private final HeaderTokenExtractor headerTokenExtractor;

  public JwtAuthenticationFilter jwtAuthenticationFilter() {
    return new JwtAuthenticationFilter(jwtResolver, headerTokenExtractor);
  }


  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

    http
        .csrf().disable()
        .sessionManagement()
        .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

  }
}
