package com.transport.smartict.bus;

import com.transport.smartict.dao.LoginDAO;
import com.transport.smartict.dao.UserDAO;
import com.transport.smartict.dao.VehicleDAO;
import com.transport.smartict.model.User;
import com.transport.smartict.model.Vehicle;
import com.transport.smartict.security.JwtTokenUtil;
import com.transport.smartict.security.SessionClientData;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
public class LoginBUS implements ILoginBUS{
	@Autowired
	private LoginDAO loginDAO;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	@Autowired
	private UserDAO userDAO;

	@Autowired
	private SessionClientData scd;

	@Override
	public JSONObject getLoginControl(String kullaniciAdi, String kullaniciSifre) {
		JSONObject sendJson = new JSONObject();

		if (kullaniciAdi == null || kullaniciAdi.equals("")) {
			sendJson.put("success",false);
			sendJson.put("message","Kullanıcı Adı bilgisi boştur");
			return sendJson;
		}

		if (kullaniciSifre == null || kullaniciSifre.equals("")) {
			sendJson.put("success",false);
			sendJson.put("message","Kullanıcı şifre bilgisi boştur");
			return sendJson;
		}

		Map<String, Object> kontrol = null;
		try {
			Authentication authentication =authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(kullaniciAdi, kullaniciSifre));
			SecurityContextHolder.getContext().setAuthentication(authentication);

			final User user = userDAO.findByUsername(kullaniciAdi);
			final String token = jwtTokenUtil.generateToken(user);
//			scd.setUserId(user.getId());
//			scd.setToken(token);

		} catch (Exception ex) {
			sendJson.put("success",false);
			sendJson.put("message","Giriş Bilgisini çekerken hata ile karşılaşıldı.");
			return sendJson;
		}

		sendJson.put("success", true);
		return sendJson;
	}
}
