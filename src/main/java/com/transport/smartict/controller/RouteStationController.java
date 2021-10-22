package com.transport.smartict.controller;

import com.transport.smartict.bus.IRouteStationBUS;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller(value = "routeStationController")
@RequestMapping(value = "/routeStation/*")
public class RouteStationController {

	@Autowired
	private IRouteStationBUS routeStationBUS;

	@RequestMapping(value = "/getRouteStation.ajax")
	public void getRouteStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeStationBUS.getRouteStation(data).toString());
	}

	@RequestMapping(value = "/saveOrUpdateRouteStation.ajax")
	public void saveOrUpdateRouteStation(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeStationBUS.saveOrUpdateRouteStation(data).toString());
	}
}
