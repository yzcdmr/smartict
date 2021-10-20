package com.transport.smartict.config;

import com.transport.smartict.bus.UserBUS;
import com.transport.smartict.security.JwtAuthenticationEntryPoint;
import com.transport.smartict.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.header.writers.frameoptions.WhiteListedAllowFromStrategy;
import org.springframework.security.web.header.writers.frameoptions.XFrameOptionsHeaderWriter;


import java.util.Arrays;

@Configuration
@EnableWebSecurity
// tüm methodların  araya girip ilk çalışacak anlamındadır.
@EnableGlobalMethodSecurity(
		securedEnabled = true,
		jsr250Enabled = true,
		prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {
	@Autowired
	UserBUS userBUS;

	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedHandler;


	@Override
	public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder
				.userDetailsService(userBUS)
				.passwordEncoder(passwordEncoder());
	}

	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Bean
	public JwtAuthenticationFilter authenticationTokenFilterBean() throws Exception {
		return new JwtAuthenticationFilter();
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
	@Override
	protected void configure(HttpSecurity http) throws Exception {
         http.authorizeRequests().antMatchers("/").permitAll().and()
                .authorizeRequests().antMatchers("/console/**").permitAll();
        http.csrf().disable();
        http.headers().frameOptions().disable();

//		http
//				.headers()
//				//.frameOptions().disable()//todo guvenlik acigi verdik, asagidaki whitelisted yapilandirildiktan sonra burasini kapat.
//				.addHeaderWriter(new XFrameOptionsHeaderWriter(new WhiteListedAllowFromStrategy(Arrays.asList("http://localhost:*"))))
//				.and()
//				.cors()
//				.and()
//				.csrf().ignoringAntMatchers("/login/**")
//				.disable()
//				.exceptionHandling()
//				.authenticationEntryPoint(unauthorizedHandler)
//				.and()
//				.sessionManagement()
//				.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
//				.and().csrf()
//				.disable()
//				.authorizeRequests()
//				.antMatchers("/",
//						"/favicon.ico",
//						"/bootstrap.json",
//						"/build/**",
//						"/*/.png",
//						"/*/.gif",
//						"/*/.svg",
//						"/*/.jpg",
//						"/*/.html",
//						"/*/.css",
//						"/*/.js",
//						"/*/.jrxml",
//						"/*/.doc",
//						"/*/.docx",
//						"/*/.pdf",
//						"/*/.xls",
//						"/*/.xlsx",
//						"/*/.txt",
//						"/v2/api-docs", "/configuration/*", "/swagger/*", "/webjars/*","/login/*")
//				.permitAll()
//				.antMatchers("/api/auth/**")
//				.permitAll()
//				.antMatchers("/api/token/**")
//				.permitAll()
//				.antMatchers("/h2-console*/*","/h2-console/login.do","/console/*","/login/*").permitAll()
//				.antMatchers("/api/user/checkUsernameAvailability", "/api/user/checkEmailAvailability","/api/report/saveUpdateReport","/api/hr/saveUpdateEmployeesPayment","/api/report/downloadReport/*","/api/downloadFile/","/api/report/exportReport/*","/login")
//				.permitAll()
//				.anyRequest()
//				.authenticated();

		http.addFilterBefore(authenticationTokenFilterBean(), UsernamePasswordAuthenticationFilter.class);
	}
}
