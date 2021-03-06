package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IVehicleBUS {
	JSONObject getVehicle(JSONObject data);

	JSONObject saveOrUpdateVehicle(JSONObject data);

	JSONObject deleteVehicle(String id);
}
