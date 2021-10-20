package com.transport.smartict.dao;

import com.transport.smartict.model.Route;
import net.sf.json.JSONObject;
import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.EntityManager;

public class BaseDAO {
	@Autowired
	private EntityManager entityManager;

	public Session getCurrentSession(){
		Session currentSession = entityManager.unwrap(Session.class);
		return currentSession;
	}

}
