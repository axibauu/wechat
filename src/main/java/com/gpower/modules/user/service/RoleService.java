package com.gpower.modules.user.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.gpower.common.result.PageInfo;
import com.gpower.modules.user.entity.Role;

import java.util.List;
import java.util.Map;

public interface RoleService extends IService<Role> {

    PageInfo queryPage(Map<String, Object> params);

    void create(Role role, String[] permissionIds);

    void update(Role role, String[] permissionIds);

    void delete(String roleId);

    List<Role> selectAll();
}
