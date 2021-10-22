package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IRouteStationBUS {
	JSONObject getRouteStation();

	JSONObject saveOrUpdateRouteStation(JSONObject data);
}
