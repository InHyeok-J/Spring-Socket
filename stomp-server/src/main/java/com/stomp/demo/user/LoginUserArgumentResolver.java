package com.stomp.demo.user;

import org.springframework.core.MethodParameter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@Component
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {

  @Override
  public boolean supportsParameter(MethodParameter parameter) {
    boolean isAuthUserAnnotation = parameter.getParameterAnnotation(LoginUser.class) != null;
    boolean isAuthUserClass = AuthUser.class.equals(parameter.getParameterType());

    return isAuthUserAnnotation && isAuthUserClass;
  }

  @Override
  public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer,
      NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    Long userId = Long.valueOf(authentication.getPrincipal().toString());
    return new AuthUser(userId, authentication.getAuthorities());
  }
}