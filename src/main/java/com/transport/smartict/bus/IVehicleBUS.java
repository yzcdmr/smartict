package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IVehicleBUS {
	JSONObject getVehicle();

	JSONObject saveOrUpdateVehicle(JSONObject data);
}
