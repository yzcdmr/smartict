package com.transport.smartict.bus;

import com.transport.smartict.dao.RouteStationDAO;
import com.transport.smartict.model.RouteStation;
import com.transport.smartict.model.RouteStationDetail;
import net.sf.json.JSON;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.concurrent.atomic.AtomicReference;


@Service
public class RouteStationBUS implements IRouteStationBUS {
	@Autowired
	private RouteStationDAO routeStationDAO;

	public JSONObject getRouteStation(JSONObject data) {
		JSONObject sonuc = new JSONObject();
		List<RouteStation> dat = routeStationDAO.getRouteStation(data);
		String stationName = "";
		JSONArray jsonArray = new JSONArray();
		for (RouteStation routeStation : dat) {
			JSONObject d = new JSONObject();
			d.put("id",routeStation.getId());
			d.put("routeName",routeStation.getRoute().getRouteName());
			List<RouteStationDetail> routeStationDetailList = routeStationDAO.getRouteStationDetailList(routeStation.getId());
			for (RouteStationDetail routeStationDetail : routeStationDetailList) {
				stationName += routeStationDetail.getStation().getStationName()+",";
			}
			d.put("stationName",stationName.substring(0,(stationName.length()-1)));
			jsonArray.add(d);
		}
		sonuc.put("data", jsonArray);
		sonuc.put("success", true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject saveOrUpdateRouteStation(JSONObject data) {
		String stationIds = data.getString("stationId");
		Long routeId = data.getLong("routeId");
		JSONObject sonuc = new JSONObject();
		if (stationIds.equals(null)) {
			sonuc.put("success", false);
			sonuc.put("message", "Station can't Null,Please select one");
			return sonuc;
		}
		if (routeId.equals(null)) {
			sonuc.put("success", false);
			sonuc.put("message", "Route can't Null,Please select one");
			return sonuc;
		}

		JSONObject par = new JSONObject();
		par.put("routeId", routeId);
		String[] sIds = stationIds.replace("[", "").replace("]", "").replace("\"", "").split(",");
		if(sIds.length<2){
			sonuc.put("success", false);
			sonuc.put("message", "You must choose at least two Stations!");
			return sonuc;
		}
		Boolean check = routeStationDAO.getRouteStation(par).size() > 0;
		if (check) {
			sonuc.put("success", false);
			sonuc.put("message", "You have already defined a route,Please select another one!");
			return sonuc;
		}
		RouteStation routeStation = new RouteStation();
		routeStation.setRouteId(routeId);
		routeStationDAO.getCurrentSession().saveOrUpdate(routeStation);
		for (String stationId : sIds) {
			RouteStationDetail routeStationDetail = new RouteStationDetail();
			routeStationDetail.setRouteStation(routeStation);
			routeStationDetail.setStationId(Long.valueOf(stationId));
			routeStationDAO.getCurrentSession().saveOrUpdate(routeStationDetail);
		}
		sonuc.put("success", true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject deleteRouteStation(String id) {
		RouteStation routeStation = routeStationDAO.getCurrentSession().load(RouteStation.class, Long.valueOf(id));
		List<RouteStationDetail> routeStationDetailList = routeStationDAO.getRouteStationDetailList(routeStation.getId());
		for (RouteStationDetail routeStationDetail : routeStationDetailList) {
			routeStationDetail.setActive(false);
			routeStationDAO.getCurrentSession().saveOrUpdate(routeStationDetail);

		}
		routeStation.setActive(false);
		routeStationDAO.getCurrentSession().saveOrUpdate(routeStation);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
