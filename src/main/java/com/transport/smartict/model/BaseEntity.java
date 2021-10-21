package com.transport.smartict.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;
import java.io.Serializable;
import java.util.Date;
//import javax

@Getter
@Setter
@MappedSuperclass
public abstract class BaseEntity implements Serializable {
	@Column(name="ACTIVE")
	private boolean active=true;
	@Column(name="LOG_DATE")
	private Date logDate;
	@Column(name="LOG_USER_ID")
	private Long logUserId;
	@Column(name="CANCEL_DATE")
	private Date cancelDate;
	@Column(name="CANCEL_USER_ID")
	private Long cancelUserId;
}
