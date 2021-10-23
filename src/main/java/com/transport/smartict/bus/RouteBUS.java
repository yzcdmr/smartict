package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteDAO;
import com.transport.smartict.model.Route;
import com.transport.smartict.model.Station;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RouteBUS implements IRouteBUS{
	@Autowired
	private RouteDAO routeDAO;
	public JSONObject getRoute(JSONObject data) {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data",routeDAO.getRoute(data));
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRoute(JSONObject data) {
		String routeName = data.getString("routeName");
		JSONObject sonuc = new JSONObject();
		if(routeName.equals("") || routeName.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Route Name can't Null,Please check value");
			return sonuc;
		}
		Route route = new Route();
		route.setRouteName(routeName);
		routeDAO.getCurrentSession().saveOrUpdate(route);
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject deleteRoute(String id) {
		Route route = routeDAO.getCurrentSession().load(Route.class, id);
		route.setActive(false);
		routeDAO.getCurrentSession().saveOrUpdate(route);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
