package com.transport.smartict.dao;

import com.transport.smartict.model.User;
import org.hibernate.query.Query;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository(value = "usersDAO")
public class UserDAO extends BaseDAO {

	public List<User> getAllUsers(){
		String sql="from Users us where us.status=true";

		Query query = getCurrentSession().createQuery(sql);

		return query.list();
	}

	public User findByUsername(String userName){
		String sql="from User us where us.active=true and us.username=:userName";

		Query query = getCurrentSession().createQuery(sql);

		query.setString("userName",userName);
		return (User)query.uniqueResult();
	}

	public User getById(long Id){
		String sql="from Users us where us.status=true and us.id=:id";

		Query query = getCurrentSession().createQuery(sql);

		query.setLong("id",Id);

		return (User)query.uniqueResult();
	}

	public List<User> getByIds(long Id){
		String sql="from User us where us.active=true and us.id=:id";

		Query query = getCurrentSession().createQuery(sql);

		query.setLong("id",Id);

		return query.list();
	}

}
