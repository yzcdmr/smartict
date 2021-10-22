package com.transport.smartict.controller;

import com.transport.smartict.bus.IVehicleBUS;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller(value = "vehicleController")
@RequestMapping(value = "/vehicle/*")
public class VehicleController {

	@Autowired
	private IVehicleBUS vehicleBUS;

	@RequestMapping(value = "/getVehicle.ajax")
	public void getVehicle(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(vehicleBUS.getVehicle(data).toString());
	}

	@RequestMapping(value = "/saveOrUpdateVehicle.ajax")
	public void saveOrUpdateVehicle(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(vehicleBUS.saveOrUpdateVehicle(data).toString());
	}
}