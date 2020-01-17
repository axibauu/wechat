package com.gpower.modules.user.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.modules.user.dao.RoleDao;
import com.gpower.modules.user.entity.Permission;
import com.gpower.modules.user.entity.Role;
import com.gpower.modules.user.entity.RolePermisson;
import com.gpower.modules.user.service.PermissionService;
import com.gpower.modules.user.service.RolePermissonService;
import com.gpower.modules.user.service.RoleService;
import com.gpower.modules.wx.entity.WxContent;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service("roleService")
public class RoleServiceImpl extends ServiceImpl<RoleDao, Role> implements RoleService {

    @Autowired
    PermissionService permissionService;

    @Autowired
    RolePermissonService rolePermissonService;

    @Autowired
    RoleDao roleDao;

    @Override
    public PageInfo queryPage(Map<String, Object> params) {
        Integer pageSize = Integer.valueOf(params.get("pageSize").toString());
        Integer currentPage = Integer.valueOf(params.get("currentPage").toString());
        Page<Role> objects = new Page <>(currentPage, pageSize);
        String name = (String) params.get("name");

        IPage<Role> name1 = roleDao.selectPage(objects, new QueryWrapper<Role>().like(StringUtils.isNotBlank(name), "name", name));


        return new PageInfo(name1);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void create(Role role, String[] permissionIds) {
        role.generateKey();
        this.save(role);

        Permission permission;
        for (String id : permissionIds) {
            permission = permissionService.getById(id);
            if (permission == null) {
                continue;
            }
            RolePermisson rolePermisson = new RolePermisson(role.getId(), id);
            rolePermisson.generateKey();
            rolePermissonService.save(rolePermisson);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void update(Role role, String[] permissionIds) {
        this.updateById(role);

        rolePermissonService.remove(new QueryWrapper<RolePermisson>().eq("role_id", role.getId()));
        Permission permission;
        for (String id : permissionIds) {
            permission = permissionService.getById(id);
            if (null == permission) {
                continue;
            }
            RolePermisson rolePermisson = new RolePermisson(role.getId(), id);
            rolePermisson.generateKey();
            rolePermissonService.save(rolePermisson);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(String roleId) {
        this.removeById(roleId);
        rolePermissonService.remove(new QueryWrapper<RolePermisson>().eq("role_id", roleId));
    }

    @Override
    public List<Role> selectAll() {
        return  roleDao.selectAll();
    }


}
