package com.gpower.common.service;



import com.gpower.common.dao.BaseDao;

import java.util.List;
import java.util.Map;

/**
  * 创建人 :liuzhongliang
  * 日    期 :2015年8月17日
  * 类说明 :抽象类，其他的类可以继承该类，不需修改
 */
public abstract class AbstractService<T> implements BaseService<T> {
	protected BaseDao<T> dao;

	public void insert(T t)  {
		this.dao.insert(t);
	}

	public void delete(T t)  {
		this.dao.delete(t);
	}

	public void update(T t)  {
		this.dao.update(t);
	}

	public T findById(String ID) {
		return this.dao.findById(ID);
	}
	
	public  List<T> selectByCondition(Map<String,Object> map){
		return this.dao.selectByCondition(map);
	}
	
	public  int selectCountByCondition(Map<String,Object> map){
		return this.dao.selectCountByCondition(map);
	}
}
