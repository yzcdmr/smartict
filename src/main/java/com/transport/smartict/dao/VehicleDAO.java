package com.transport.smartict.dao;

import com.transport.smartict.model.Vehicle;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class VehicleDAO extends BaseDAO{
	public List<Map<String,Object>> getVehicle(JSONObject data) {
		String vehicleName = data.getString("vehicleName");
		Criteria crit = getCurrentSession().createCriteria(Vehicle.class);
		if(vehicleName!=null){
			crit.add(Restrictions.eq("vehicleName", vehicleName));
		}
		crit.addOrder(Order.asc("vehicleName"));
		return crit.list();
	}
}
