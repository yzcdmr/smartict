package com.transport.smartict.security;

import com.transport.smartict.model.User;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@SuppressWarnings("serial")
@Component(value = "scd")
@Scope(proxyMode = ScopedProxyMode.TARGET_CLASS, value = "session")
public class SessionClientData implements Serializable {
	private Long userId;
	private String token;

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
