package com.transport.smartict.controller;

import org.dom4j.rule.Mode;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.HashMap;
import java.util.Map;

@Controller
public class loginController {

	@RequestMapping(value = "/anasayfa.htm", method = RequestMethod.GET)
	public ModelAndView hnd_anasayfa(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		Map<String, Object> m = new HashMap<>();
		m.put("zaman", new SimpleDateFormat("d/M/yyyy").format(Calendar.getInstance().getTime()));

		return  new ModelAndView("gen/anasayfa",m);
	}

}
