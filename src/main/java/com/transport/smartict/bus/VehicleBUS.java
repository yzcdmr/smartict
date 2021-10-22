package com.transport.smartict.bus;

import com.transport.smartict.dao.VehicleDAO;
import com.transport.smartict.model.Vehicle;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class VehicleBUS implements IVehicleBUS{
	@Autowired
	private VehicleDAO vehicleDAO;
	public JSONObject getVehicle() {
		JSONObject sonuc = new JSONObject();
		sonuc.put("data",vehicleDAO.getVehicle());
		sonuc.put("success",true);
		return sonuc;
	}

	@Override
	@Transactional(readOnly= false)
	public JSONObject saveOrUpdateVehicle(JSONObject data) {
		Vehicle vehicle = new Vehicle();
		vehicle.setVehicleName("Sinan");
		vehicleDAO.getCurrentSession().saveOrUpdate(vehicle);
		JSONObject sonuc = new JSONObject();
		sonuc.put("success",true);
		return sonuc;
	}
}
