package com.transport.smartict.controller;

import com.transport.smartict.bus.IRouteVehicleBUS;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller(value = "routeVehicleController")
@RequestMapping(value = "/routeVehicle/*")
public class RouteVehicleController {

	@Autowired
	private IRouteVehicleBUS routeVehicleBUS;

	@RequestMapping(value = "/getRouteVehicle.ajax")
	public void getRouteVehicle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeVehicleBUS.getRouteVehicle(data).toString());
	}

	@RequestMapping(value = "/saveOrUpdateRouteVehicle.ajax")
	public void saveOrUpdateRouteVehicle(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeVehicleBUS.saveOrUpdateRouteVehicle().toString());
	}
}
