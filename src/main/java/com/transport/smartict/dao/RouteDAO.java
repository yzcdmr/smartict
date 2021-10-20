package com.transport.smartict.dao;

import com.transport.smartict.model.Route;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteDAO  extends BaseDAO{
	public List<Map<String,Object>> getRoute() {
		Criteria crit = getCurrentSession().createCriteria(Route.class);
		return crit.list();
	}
}
