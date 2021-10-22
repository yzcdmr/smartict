package com.transport.smartict.controller;

import com.transport.smartict.bus.IStationBUS;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller(value = "stationController")
@RequestMapping(value = "/station/*")
public class StationController {

	@Autowired
	private IStationBUS stationBUS;

	@RequestMapping(value = "/getStation.ajax")
	public void getStation(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.getWriter().write(stationBUS.getStation().toString());
	}

	@RequestMapping(value = "/saveOrUpdateStation.ajax")
	public void saveOrUpdateStation(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(stationBUS.saveOrUpdateStation(data).toString());
	}
}
