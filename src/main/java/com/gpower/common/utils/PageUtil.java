package com.gpower.common.utils;

import java.util.List;

/**
 * @description:
 * @author: jingff
 * @date: 2019-08-23 10:57
 */
public class PageUtil {

    public static List <?> getListPage(int page, int pageSize, List<?> list) {
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
