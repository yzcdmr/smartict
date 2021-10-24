package com.transport.smartict.bus;

import com.transport.smartict.dao.StationDAO;
import com.transport.smartict.model.Station;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class StationBUS implements IStationBUS {

	@Autowired
	private StationDAO stationDAO;

	public JSONObject getStation(JSONObject data) {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data", stationDAO.getStation(data));
		sonuc.put("success", true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject saveOrUpdateStation(JSONObject data) {
		String stationName = data.getString("stationName");
		JSONObject sonuc = new JSONObject();
		if(stationName.equals("") || stationName.equals(null)){
			sonuc.put("success",false);
			sonuc.put("message","Station Name can't Null,Please check value");
			return sonuc;
		}
		Station station = new Station();
		station.setStationName(stationName);
		stationDAO.getCurrentSession().saveOrUpdate(station);
		sonuc.put("success", true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject deleteStation(String id) {
		Station station = stationDAO.getCurrentSession().load(Station.class,  Long.valueOf(id));
		station.setActive(false);
		stationDAO.getCurrentSession().saveOrUpdate(station);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
