package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteVehicleDAO;
import com.transport.smartict.model.RouteVehicle;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RouteVehicleBUS implements IRouteVehicleBUS{
	@Autowired
	private RouteVehicleDAO routeVehicleDAO;
	public JSONObject getRouteVehicle(JSONObject data) {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data",routeVehicleDAO.getRouteVehicle());
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRouteVehicle() {
		RouteVehicle routeVehicle = new RouteVehicle();
		routeVehicle.setRouteId(1l);
		routeVehicle.setVehicleId(1l);
		routeVehicleDAO.getCurrentSession().saveOrUpdate(routeVehicle);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success",true);
		return sonuc;
	}
}
