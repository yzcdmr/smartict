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

	public JSONObject getStation() {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data", stationDAO.getStation());
		sonuc.put("success", true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly = false)
	public JSONObject saveOrUpdateStation() {
		Station station = new Station();
		station.setStationName("Sinan");
		stationDAO.getCurrentSession().saveOrUpdate(station);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success", true);
		return sonuc;
	}
}
