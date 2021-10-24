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
		String vehicleName = "";
		String plate = "";
		if(!data.isNullObject()){
			vehicleName = data.getString("vehicleName");
			plate = data.getString("plate");
		}
		Criteria crit = getCurrentSession().createCriteria(Vehicle.class);
		if(!vehicleName.equals("") && vehicleName!=null){
			crit.add(Restrictions.eq("vehicleName", vehicleName));
		}
		if(!plate.equals("") && plate!=null){
			crit.add(Restrictions.eq("plate", plate));
		}
		crit.addOrder(Order.asc("vehicleName"));
		return crit.list();
	}
}
