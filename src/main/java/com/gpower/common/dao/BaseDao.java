package com.gpower.common.dao;

import java.util.List;
import java.util.Map;

/**
  * 创建人 :liuzhongliang
  * 日    期 :2015年8月17日
  * 类说明 :抽象BaseDao接口
 */
public abstract interface BaseDao<T>{
	/**
	  * <p>@description :写入数据</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param paramT </p>
	 */
	public abstract void insert(T paramT);
	/**
	  * <p>@description :删除数据</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param paramT </p>
	 */
	public abstract void delete(T paramT);
	/**
	  * <p>@description :修改</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param paramT </p>
	 */
	public abstract void update(T paramT);
	/**
	  * <p>@description :根据主键查询</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param ID</p>
	  * <p>@return </p>
	 */
	public abstract T findById(String ID);
	/**
	  * <p>@description :条件查询</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param map</p>
	  * <p>@return </p>
	 */
	public abstract List<T> selectByCondition(Map <String, Object> map);
	/**
	  * <p>@description :条件查询总数</p>
	  *	<p>@version :0.1</p>
	  * <p>@author :liuzl</p>
	  * <p>@param map</p>
	  * <p>@return </p>
	 */
	public abstract int selectCountByCondition(Map <String, Object> map);

	
}
