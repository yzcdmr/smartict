package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteStationDAO;
import com.transport.smartict.model.RouteStation;
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
		sonuc.put("data",routeStationDAO.getRouteStation());
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateRouteStation(JSONObject data) {
		RouteStation routeStation = new RouteStation();
		routeStation.setRouteId(1l);
		routeStation.setStationId(1l);
		routeStationDAO.getCurrentSession().saveOrUpdate(routeStation);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success",true);
		return sonuc;
	}
}
