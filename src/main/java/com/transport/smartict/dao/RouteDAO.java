package com.transport.smartict.dao;

import com.transport.smartict.model.Route;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteDAO  extends BaseDAO{
	public List<Map<String,Object>> getRoute(JSONObject data) {
		String routeName = "";
		if(!data.isNullObject()){
			routeName = data.getString("routeName");
		}
		Criteria crit = getCurrentSession().createCriteria(Route.class);
		if(!routeName.equals("") && !routeName.equals(null)){
			crit.add(Restrictions.ilike("routeName", routeName, MatchMode.ANYWHERE));
		}
		crit.addOrder(Order.asc("routeName"));
		return crit.list();
	}
}
