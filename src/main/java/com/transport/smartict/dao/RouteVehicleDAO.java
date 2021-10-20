package com.transport.smartict.dao;

import com.transport.smartict.model.RouteVehicle;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteVehicleDAO extends BaseDAO{
	public List<Map<String,Object>> getRouteVehicle() {
		Criteria crit = getCurrentSession().createCriteria(RouteVehicle.class);
		return crit.list();
	}
}
