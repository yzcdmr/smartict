package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IRouteBUS {
	JSONObject getRoute();

	JSONObject saveOrUpdateRoute(JSONObject data);
}
