package com.transport.smartict.dao;

import com.transport.smartict.model.RouteVehicle;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteVehicleDAO extends BaseDAO{
	public List<Map<String,Object>> getRouteVehicle(JSONObject data) {
		Long routeId = (data.get("routeId")==null || data.get("routeId").equals(""))?null:data.getLong("routeId");
		Long vehicleId = (data.get("vehicleId")==null || data.get("vehicleId").equals(""))?null:data.getLong("vehicleId");
		StringBuilder s = new StringBuilder();
		s.append("select new map(");
		s.append("rv.id as id,");
		s.append("(select r.routeName from Route r where r.id=rv.routeId) as routeName,");
		s.append("(select v.vehicleName from Vehicle v where v.id=rv.vehicleId) as vehicleName");
		s.append(") from RouteVehicle rv ");
		s.append("where rv.active=true ");
		if(routeId!=null){
			s.append("and rv.routeId=:routeId ");
		}
		if(vehicleId!=null){
			s.append("and rv.vehicleId=:vehicleId ");
		}
		Query q = getCurrentSession().createQuery(s.toString());
		if(vehicleId!=null){
			q.setParameter("vehicleId",vehicleId);
		}
		if(routeId!=null){
			q.setParameter("routeId",routeId);
		}
		return q.list();
	}
}
