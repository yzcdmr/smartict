package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IRouteVehicleBUS {
	JSONObject getRouteVehicle(JSONObject data);

	JSONObject saveOrUpdateRouteVehicle();
}
