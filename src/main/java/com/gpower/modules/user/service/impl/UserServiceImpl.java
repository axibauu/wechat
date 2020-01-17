package com.gpower.modules.user.service.impl;

import cn.hutool.core.util.ObjectUtil;
import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.dao.UserRoleDao;
import com.gpower.modules.user.entity.*;
import com.gpower.modules.user.service.*;
import org.apache.commons.collections4.CollectionUtils;
import org.aspectj.weaver.ast.Var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service("userService")
public class UserServiceImpl extends ServiceImpl<UserDao, User> implements UserService {

    @Autowired
    UserRoleService userRoleService;

    @Autowired
    RoleService roleService;

    @Autowired
    UserInfoService userInfoService;
    @Autowired
    UserDao userDao;

    @Autowired
    UserRoleDao userRoleDao;
    @Autowired
    UserGroupService userGroupService;
    @Autowired
    GroupDao groupDao;

    @Override
    public PageInfo queryPage(Map <String, Object> params, Collection <String> allPermissions, String loginUsername) {
        List <String> collect=new ArrayList <>();
        Query.setSorts(Arrays.asList("create_time", "name"));
        Query.setOrder("desc");
        String name = (String) params.get("userName");
        String fullName = (String) params.get("userFullName");
        String startCreateTime = (String) params.get("startCreateTime");
        String endCreateTime = (String) params.get("endCreateTime");

        if(allPermissions.contains("user")){//yuanji
            User user = userDao.selectOne(new QueryWrapper <User>().eq("name", loginUsername));
            List <UserGroup> userGrouplist = userGroupService.list(new QueryWrapper <UserGroup>().eq("userId", user.getId()));
            collect = userGrouplist.stream().map(UserGroup::getGroupId).collect(Collectors.toList());
            List <UserGroup> userGroup =
                    userGroupService.list(new QueryWrapper <UserGroup>().in(!ObjectUtil.isEmpty(collect),
                    "groupId", collect));
            List <String> collect1 = userGroup.stream().map(UserGroup::getUserId).collect(Collectors.toList());
            List <User> users = userDao.selectList(new QueryWrapper <User>().in(CollectionUtils.isNotEmpty(collect1),"ID", collect1));
           if(CollectionUtils.isEmpty(users)){
               return new PageInfo(null);
           }
            collect= users.stream().map(User::getId).collect(Collectors.toList());

            if(allPermissions.contains("role")){
                List <User> users1 =  userDao.selectList(new QueryWrapper <User>());
                Iterator<User> iterator = users1.iterator();
                if(iterator.hasNext()){
                    User next = iterator.next();if(next.getName().equals("admin")){
                        iterator.remove();
                    }

                }
                collect = users1.stream().map(User::getId).collect(Collectors.toList());
                System.out.println("collect"+collect);
            }
            if(collect.contains("1")){
               collect.remove("1");
            }
            if(collect.contains(user.getId())){
                collect.remove(user.getId());
            }
        }
        IPage<User> page=null;
      if(CollectionUtils.isNotEmpty(collect)){
          LambdaQueryWrapper <User> eq = new QueryWrapper <User>().lambda().like(StrUtil.isNotBlank
                          (name), User::getName,
                  name).like(StrUtil.isNotBlank(fullName), User::getFullName, fullName)
                  .gt(StrUtil.isNotBlank(startCreateTime),User::getCreateTime,startCreateTime)
                  .le(StrUtil.isNotBlank(endCreateTime),User::getCreateTime,endCreateTime).in(CollectionUtils.isNotEmpty(collect),User::getId,collect);
          page = page(
                  new Query<User>(params).getPage(),eq
          );
          List<User> users = page.getRecords();
          if(CollectionUtils.isNotEmpty(users)){
          for (User user : users) {
              String id = user.getId();
              Role role = userRoleDao.selectRoleByUserId(id);
              if(!ObjectUtil.isEmpty(role)){
                  user.setRole(role.getId());
              }

          }
              for (User user : users) {
                  System.out.println("1111"+user.toString());

              }
          return new PageInfo(page);
      }}

        return null;

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public boolean create(User user) {
        user.setCreateTime(new Date());
        user.generateKey();
        this.save(user);
UserRole  userRole=new UserRole();
        userRole.generateKey();
        userRole.setRoleId(user.getRole());
        userRole.setUserId(user.getId());

        userRoleDao.insert(userRole);
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName(user.getFullName());
        userInfo.setPhone(user.getPhone());
        userInfo.setId(user.getId());
        userInfo.setName(user.getName());
        userInfo.setCreateTime(new Date());
        return userInfoService.save(userInfo);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    // @CacheEvict(value="GpConstantCache", allEntries=true)
    public void delete(String id) {
        // 删除用户
        this.removeById(id);
        // 删除用户详细信息
        userInfoService.removeById(id);
        // 删除用户对应的角色信息
        userRoleService.remove(new QueryWrapper<UserRole>().lambda().eq(UserRole::getUserId, id));
    }

    @Override
    public boolean updatePassword(Long userId, String password, String newPassword) {
        return false;
    }

    @Override
    public void grantRoles(String userId, String[] roleIds) {
        System.out.println("userId-----"+userId);
        System.out.println(Arrays.toString(roleIds));
        User user = this.getById(userId);
        if (null == user) {
            throw new GpException("用户不存在");
        }
        if (user.getName().equals("admin")) {
            throw new GpException("不允许编辑");
        }
        userRoleDao.deleteByUserId(userId);
     //   userRoleService.remove(new QueryWrapper<UserRole>().lambda().eq(UserRole::getUserId,
          //      userId));
        for (String roleId : roleIds) {
            Role role = roleService.getById(roleId);
            if (null == role) {
                continue;
            }
            UserRole userRole = new UserRole(userId, roleId);
            userRole.generateKey();
            userRoleService.save(userRole);
        }

    }

    @Override
    public void updatePassword(String id, String oldPassword, String password) {
        User user = this.getById(id);
        if (!user.getPassword().equals(oldPassword)) {
            throw new GpException("旧密码输入不正确！");
        }
        user = new User();
        user.setId(id);
        user.setPassword(password);
        this.updateById(user);
    }

    @Override
    // @Cacheable(value="GpConstantCache", key = "methodName")
    public User selectUserById(String userId) {
        return this.baseMapper.selectById(userId);
    }

    @Override
    public List<User> selectAll() {
        return  userDao.selectAll();
    }


}
