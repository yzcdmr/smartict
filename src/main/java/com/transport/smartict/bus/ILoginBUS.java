package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface ILoginBUS {
	JSONObject getLoginControl(String kullaniciAdi, String kullaniciSifre);
}
