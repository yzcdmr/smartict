package com.transport.smartict.bus;

import net.sf.json.JSONObject;

public interface IStationBUS {
	JSONObject getStation(JSONObject data);

	JSONObject saveOrUpdateStation(JSONObject data);
}
