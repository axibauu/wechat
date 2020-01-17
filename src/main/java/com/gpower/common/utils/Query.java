package com.gpower.common.utils;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.apache.commons.lang.StringUtils;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 查询参数
 */
public class Query<T> extends LinkedHashMap<String, Object> {

    /**
     * mybatis-plus排序字段List<String>
     */
    private static ThreadLocal<List<String>> sorts = new ThreadLocal<>();

    /**
     * mybatis-plus排序方式
     * DESC ：降序
     * ASC ：升序
     */
    private static ThreadLocal<String> order = new ThreadLocal<>();

    private static final long serialVersionUID = 1L;
    /**
     * mybatis-plus分页参数
     */
    private Page<T> page;
    /**
     * 当前页码
     */
    private int currentPage = 1;
    /**
     * 每页条数
     */
    private int pageSize = 10;

    public Query(Map<String, Object> params) {
        this.putAll(params);

        //分页参数
        if (params.get("currentPage") != null) {
            currentPage = Integer.parseInt((String) params.get("currentPage"));
        }
        if (params.get("pageSize") != null) {
            pageSize = Integer.parseInt((String) params.get("pageSize"));
        }

        this.put("currentPage", currentPage);
        this.put("pageSize", pageSize);

        List<String> sort = (List<String>) params.get("sort");

        // 防止SQL注入（sort、order是通过拼接SQL实现排序的，会有SQL注入风险）
        //  order不是从params(客户端接收)，不会有注入的风险
        // String order = SQLFilter.sqlInject((String) params.get("order"));
        String order = (String) params.get("order");
        this.put("sort", sort);
        this.put("order", order);

        //mybatis-plus分页
        this.page = new Page<>(currentPage, pageSize);

        // 从绑定的线程里边获取排序方式
        sort = getSorts();
        order = getOrder();

        //排序
        if (null != sort && StringUtils.isNotBlank(order)) {
            if ("ASC".equalsIgnoreCase(order)) {
                this.page.setAscs(sort);
            } else {
                this.page.setDescs(sort);
            }
        }

    }

    public Page<T> getPage() {
        return page;
    }

    public int getcurrentPage() {
        return currentPage;
    }

    public int getPageSize() {
        return pageSize;
    }

    private static List<String> getSorts() {
        List<String> strings = sorts.get();
        // 使用完以后及时remove，避免线程池复用导致出错
        sorts.remove();
        return strings;
    }

    public static void setSorts(List<String> list) {
        sorts.set(list);
    }

    private static String getOrder() {
        String s = order.get();
        // 使用完以后及时remove，避免线程池复用导致出错
        order.remove();
        return s;
    }

    public static void setOrder(String way) {
        order.set(way);
    }
}
