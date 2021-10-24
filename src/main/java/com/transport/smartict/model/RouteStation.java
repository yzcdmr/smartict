package com.transport.smartict.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="ROUTE_STATION")
@Data
public class RouteStation extends BaseEntity {
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "seq")
	@GenericGenerator(name="seq",strategy = "increment")
	private Long id;
	@Column(name="ROUTE_ID")
	private Long routeId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="ROUTE_ID",updatable = false,insertable = false)
	private Route route;
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "routeStation", cascade = CascadeType.ALL)
	private List<RouteStationDetail> routeStationDetailList= new ArrayList<RouteStationDetail>();
}
