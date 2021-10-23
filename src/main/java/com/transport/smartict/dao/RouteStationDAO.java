package com.transport.smartict.dao;

import com.transport.smartict.model.RouteStation;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteStationDAO extends BaseDAO{
	public List<Map<String,Object>> getRouteStation(JSONObject data) {
		Long stationId = (data.get("stationId")==null || data.get("stationId").equals(""))?null:data.getLong("stationId");
		Long routeId = (data.get("routeId")==null || data.get("routeId").equals(""))?null:data.getLong("routeId");
		StringBuilder s = new StringBuilder();
		s.append("select new map(");
		s.append("rs.id as id,");
		s.append("(select s.stationName from Station s where s.id=rs.stationId) as stationName,");
		s.append("(select r.routeName from Route r where r.id=rs.routeId) as routeName");
		s.append(") from RouteStation rs ");
		s.append("where rs.active=true ");
		if(routeId!=null){
			s.append("and rs.routeId=:routeId ");
		}
		if(stationId!=null){
			s.append("and rs.stationId=:stationId ");
		}
		Query q = getCurrentSession().createQuery(s.toString());
		if(routeId!=null){
			q.setParameter("routeId",routeId);
		}
		if(stationId!=null){
			q.setParameter("stationId",stationId);
		}
		return q.list();
	}
}
