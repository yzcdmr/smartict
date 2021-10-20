package com.transport.smartict.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="VEHICLE")
@Data
public class Vehicle extends BaseEntity {
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "seq")
	@GenericGenerator(name="seq",strategy = "increment")
	private Long id;
	@Column(name="VEHICLE_NAME")
	private String vehicleName;
	@Column(name="PLATE")
	private String plate;
}
