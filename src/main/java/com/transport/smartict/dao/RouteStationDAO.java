package com.transport.smartict.dao;

import com.transport.smartict.model.RouteStation;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteStationDAO extends BaseDAO{
	public List<Map<String,Object>> getRouteStation() {
		Criteria crit = getCurrentSession().createCriteria(RouteStation.class);
		return crit.list();
	}
}
