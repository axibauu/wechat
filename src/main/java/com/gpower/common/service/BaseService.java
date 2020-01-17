package com.gpower.common.service;

import java.util.List;
import java.util.Map;

/**
  * 创建人 :liuzhongliang
  * 日    期 :2015年8月17日
  * 类说明 :抽象Service接口，不需修改
 */
public abstract interface BaseService<T> {
	public  void insert(T paramT) ;

	public  void delete(T paramT) ;

	public  void update(T paramT) ;

	public  T findById(String ID) ;
	
	public  List<T> selectByCondition(Map <String, Object> map);

	public  int selectCountByCondition(Map <String, Object> map);

}
