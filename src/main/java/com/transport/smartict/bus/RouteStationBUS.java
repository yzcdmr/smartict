package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteStationDAO;
import com.transport.smartict.model.RouteStation;
import com.transport.smartict.model.Station;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
public class RouteStationBUS implements IRouteStationBUS{
	@Autowired
	private RouteStationDAO routeStationDAO;
	public JSONObject getRouteStation(JSONObject data) {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data",routeStationDAO.getRouteStation(data));
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRouteStation(JSONObject data) {
		Long stationId = data.getLong("stationId");
		Long routeId = data.getLong("routeId");
		JSONObject sonuc = new JSONObject();
		if(stationId.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Station can't Null,Please select one");
			return sonuc;
		}
		if(routeId.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Route can't Null,Please select one");
			return sonuc;
		}

		RouteStation routeStation = new RouteStation();
		routeStation.setRouteId(routeId);
		routeStation.setStationId(stationId);
		routeStationDAO.getCurrentSession().saveOrUpdate(routeStation);
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject deleteRouteStation(String id) {
		RouteStation routeStation = routeStationDAO.getCurrentSession().load(RouteStation.class, id);
		routeStation.setActive(false);
		routeStationDAO.getCurrentSession().saveOrUpdate(routeStation);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
