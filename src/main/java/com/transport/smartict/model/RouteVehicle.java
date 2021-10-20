package com.transport.smartict.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="ROUTE_VEHICLE")
@Data
public class RouteVehicle extends BaseEntity{
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "seq")
	@GenericGenerator(name="seq",strategy = "increment")
	private Long id;
	@Column(name="ROUTE_ID")
	private Long routeId;
	@Column(name="VEHICLE_ID")
	private Long vehicleId;
}
