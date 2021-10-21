package com.transport.smartict.dao;

import com.transport.smartict.model.Vehicle;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class LoginDAO extends BaseDAO{
	public Map<String, Object> getKontrol(String kullaniciAdi, String kullaniciSifre) {
		StringBuilder hqlBuilder=new StringBuilder();

		hqlBuilder.append("from User us where us.active=true and us.username=:kullaniciAdi and us.password=:sifre");
		Query query= getCurrentSession().createQuery(hqlBuilder.toString());

		query.setString("kullaniciAdi",kullaniciAdi);
		query.setString("sifre",kullaniciSifre);

		query.setMaxResults(1);
		return  (Map<String,Object>)query.uniqueResult();
	}
}
