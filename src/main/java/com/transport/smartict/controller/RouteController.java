package com.transport.smartict.controller;

import com.transport.smartict.bus.IRouteBUS;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Controller(value = "routeController")
@RequestMapping(value = "/route/*")
public class RouteController {

	@Autowired
	private IRouteBUS routeBUS;

	@RequestMapping(value = "/getRoute.ajax")
	public void getRoute(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeBUS.getRoute(data).toString());
	}

	@RequestMapping(value = "/saveOrUpdateRoute.ajax")
	public void saveOrUpdateRoute(HttpServletRequest request,HttpServletResponse response) throws Exception {
		JSONObject data = JSONObject.fromObject(request.getParameter("data"));
		response.getWriter().write(routeBUS.saveOrUpdateRoute(data).toString());
	}
}
