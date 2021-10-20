package com.transport.smartict.dao;

import com.transport.smartict.model.Vehicle;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class VehicleDAO extends BaseDAO{
	public List<Map<String,Object>> getVehicle() {
		Criteria crit = getCurrentSession().createCriteria(Vehicle.class);
		return crit.list();
	}
}
