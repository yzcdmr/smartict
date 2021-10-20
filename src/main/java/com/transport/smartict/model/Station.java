package com.transport.smartict.model;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Table(name="STATION")
@Data
public class Station extends BaseEntity {
	@Id
	@Column(name = "ID", nullable = false)
	@GeneratedValue(strategy = GenerationType.AUTO,generator = "seq")
	@GenericGenerator(name="seq",strategy = "increment")
	private Long id;
	@Column(name="STATION_NAME")
	private String stationName;
}
