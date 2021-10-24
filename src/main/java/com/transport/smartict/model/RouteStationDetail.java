package com.transport.smartict.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="ROUTE_STATION")
@Data
public class RouteStationDetail extends BaseEntity {
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "seq")
	@GenericGenerator(name="seq",strategy = "increment")
	private Long id;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name="ROUTE_STATION_ID")
	private RouteStation routeStation;

	@Column(name="STATION_ID")
	private Long stationId;
}
