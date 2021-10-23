package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IRouteBUS {
	JSONObject getRoute(JSONObject data);

	JSONObject saveOrUpdateRoute(JSONObject data);

	JSONObject deleteRoute(String id);
}
