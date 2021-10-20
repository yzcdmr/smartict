package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteDAO;
import com.transport.smartict.model.Route;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RouteBUS implements IRouteBUS{
	@Autowired
	private RouteDAO routeDAO;
	public JSONObject getRoute() {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data",routeDAO.getRoute());
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRoute() {
		Route route = new Route();
		route.setRouteName("Sinan");
		routeDAO.getCurrentSession().saveOrUpdate(route);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success",true);
		return sonuc;
	}
}
