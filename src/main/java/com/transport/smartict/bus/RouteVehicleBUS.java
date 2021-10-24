package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteVehicleDAO;
import com.transport.smartict.model.RouteVehicle;
import com.transport.smartict.model.Station;
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
		sonuc.put("data",routeVehicleDAO.getRouteVehicle(data));
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRouteVehicle(JSONObject data) {
		Long routeId = data.getLong("routeId");
		Long vehicleId = data.getLong("vehicleId");
		JSONObject sonuc = new JSONObject();
		if(routeId.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Route can't Null,Please select one");
			return sonuc;
		}
		if(vehicleId.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Vehicle can't Null,Please select one");
			return sonuc;
		}
		RouteVehicle routeVehicle = new RouteVehicle();
		routeVehicle.setRouteId(routeId);
		routeVehicle.setVehicleId(vehicleId);
		routeVehicleDAO.getCurrentSession().saveOrUpdate(routeVehicle);
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject deleteRouteVehicle(String id) {
		RouteVehicle routeVehicle = routeVehicleDAO.getCurrentSession().load(RouteVehicle.class,  Long.valueOf(id));
		routeVehicle.setActive(false);
		routeVehicleDAO.getCurrentSession().saveOrUpdate(routeVehicle);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
