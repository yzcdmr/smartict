package com.transport.smartict.dao;

import com.transport.smartict.model.Station;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class StationDAO  extends BaseDAO{
	public List<Map<String,Object>> getStation(JSONObject data) {
		String stationName = "";
		if(!data.isNullObject()){
			stationName = data.getString("stationName");
		}
		Criteria crit = getCurrentSession().createCriteria(Station.class);
		if(!stationName.equals("") && !stationName.equals(null)){
			crit.add(Restrictions.ilike("stationName", stationName, MatchMode.ANYWHERE));
		}
		crit.addOrder(Order.asc("stationName"));
		return crit.list();
	}
}
