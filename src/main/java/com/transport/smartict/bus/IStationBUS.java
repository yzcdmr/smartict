package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IStationBUS {
	JSONObject getStation();

	JSONObject saveOrUpdateStation(JSONObject data);
}
