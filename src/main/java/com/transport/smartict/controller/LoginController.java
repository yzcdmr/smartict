package com.transport.smartict.controller;

import com.transport.smartict.bus.ILoginBUS;
import com.transport.smartict.security.SessionClientData;
import net.sf.json.JSONObject;
import org.dom4j.rule.Mode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
public class LoginController {
	@Autowired
	private ILoginBUS loginBUS;

	@Autowired
	private SessionClientData scd;

	@RequestMapping(value = "/anasayfa.htm", method = RequestMethod.GET)
	public ModelAndView hnd_anasayfa(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Map<String, Object> m = new HashMap<>();
		m.put("zaman", new SimpleDateFormat("d/M/yyyy").format(Calendar.getInstance().getTime()));

		return  new ModelAndView("anasayfa",m);
	}

	@RequestMapping(value = "/login.html", method = RequestMethod.GET)
	public ModelAndView login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map m = new HashMap();
		m.put("title", "LOGIN");
		m.put("date", new Date());
//		m.put("kurumBaslik", "AAAAA");
		m.put("publicRecaptiva","6Lfs8sMUAAAAAMrfFx2k6EpJQxgMRB5nqVLpT7w3");
		return new ModelAndView("login", m);
	}

	@RequestMapping(value = "/loginControl.ajax")
	public void hnd_checkLoginControl(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String kullaniciAdi = request.getParameter("kullaniciAdi");
		String kullaniciSifre = request.getParameter("kullaniciSifre");
		JSONObject sendJson = loginBUS.getLoginControl(kullaniciAdi,kullaniciSifre);
		response.getWriter().write(sendJson.toString());
//		if (sendJson.getBoolean("success")){
//			return hnd_anasayfa(request,response);
//		}
//		else{
//			Map<String, Object> m = new HashMap<>();
//			m.put("zaman", new SimpleDateFormat("d/M/yyyy").format(Calendar.getInstance().getTime()));
//
//			return  new ModelAndView("login",m);
//		}
	}


}
