package com.transport.smartict.dao;

import com.transport.smartict.model.Station;
import org.hibernate.Criteria;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class StationDAO  extends BaseDAO{
	public List<Map<String,Object>> getStation() {
		Criteria crit = getCurrentSession().createCriteria(Station.class);
		return crit.list();
	}
}
