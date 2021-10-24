package com.transport.smartict.dao;

import com.transport.smartict.model.Route;
import com.transport.smartict.model.RouteStation;
import com.transport.smartict.model.RouteStationDetail;
import net.sf.json.JSONObject;
import org.hibernate.Criteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class RouteStationDAO extends BaseDAO{
	public List<RouteStation> getRouteStation(JSONObject data) {
		String stationIds = (data.get("stationId")==null || data.get("stationId").equals(""))?null:data.getString("stationId");
		Long routeId = (data.get("routeId")==null || data.get("routeId").equals(""))?null:data.getLong("routeId");
		StringBuilder s = new StringBuilder();
		s.append("from RouteStation rs ");
		s.append("where rs.active=true ");
		if(routeId!=null){
			s.append("and rs.routeId=:routeId ");
		}
		if(stationIds!=null){
			s.append("and exists (select 1 from RouteStationDetail rsd where rsd.routeStation=rs and rsd.active=true and rsd.station.stationId in (:stationId)) ");
		}
		Query q = getCurrentSession().createQuery(s.toString());
		if(routeId!=null){
			q.setParameter("routeId",routeId);
		}
		if(stationIds!=null){
			String[] sIds = stationIds.replace("[", "").replace("]", "").replace("\"", "").split(",");
			q.setParameterList("stationId",sIds);
		}
		return q.list();
	}

	public List<RouteStationDetail> getRouteStationDetailList(Long id) {
		Criteria crit = getCurrentSession().createCriteria(RouteStationDetail.class);
		crit.add(Restrictions.eq("routeStation.id", id));
		crit.addOrder(Order.asc("id"));
		return crit.list();
	}
}
