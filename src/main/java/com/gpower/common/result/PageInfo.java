/**
 * Copyright 2018 人人开源 http://www.renren.io
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package com.gpower.common.result;

import com.baomidou.mybatisplus.core.metadata.IPage;
import lombok.Getter;
import lombok.Setter;
import org.apache.poi.ss.formula.functions.T;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * 分页工具类
 * 
 */
@Getter
@Setter
public class PageInfo implements Serializable {
	private static final long serialVersionUID = 1L;
	//总记录数
	private long totalCount;
	//每页记录数
	private long pageSize;
	//总页数
	private long totalPage;
	//当前页数
	private long currentPage;
	//列表数据
	private List<?> list;
	
	/**
	 * 分页
	 * @param list        列表数据
	 * @param totalCount  总记录数
	 * @param pageSize    每页记录数
	 * @param currPage    当前页数
	 */
	public PageInfo(List<?> list, int totalCount, int pageSize, int currPage) {
		this.list = list;
		this.totalCount = totalCount;
		this.pageSize = pageSize;
		this.currentPage = currPage;
		this.totalPage = (int)Math.ceil((double)totalCount/pageSize);


	}

	/**
	 * 分页
	 */
	public PageInfo(IPage page) {
		this.list = page.getRecords();
		this.totalCount = page.getTotal();
		this.pageSize = page.getSize();
		this.currentPage = page.getCurrent();
		this.totalPage = page.getPages();
	}


	public static List<?> getListPage(int page, int pageSize, List<?> list) {
		if (list == null || list.size() == 0) {
			throw new RuntimeException("分页数据不能为空!");
		}

		int totalCount = list.size();
		page = page - 1;
		int fromIndex = page * pageSize;
		//分页不能大于总数
		if(fromIndex>=totalCount) {
			throw new RuntimeException("页数或分页大小不正确!");
		}
		int toIndex = ((page + 1) * pageSize);
		if (toIndex > totalCount) {
			toIndex = totalCount;
		}

		return list.subList(fromIndex, toIndex);

	}



}
