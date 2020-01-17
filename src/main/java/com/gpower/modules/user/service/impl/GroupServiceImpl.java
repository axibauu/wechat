package com.gpower.modules.user.service.impl;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.gpower.common.exception.GpException;
import com.gpower.common.result.PageInfo;
import com.gpower.common.utils.Query;
import com.gpower.common.utils.ShiroUtil;
import com.gpower.common.utils.UUIDGenerator;
import com.gpower.modules.user.dao.GroupDao;
import com.gpower.modules.user.dao.RolePermissionDao;
import com.gpower.modules.user.dao.UserDao;
import com.gpower.modules.user.dao.UserGroupDao;
import com.gpower.modules.user.entity.Group;
import com.gpower.modules.user.entity.RolePermisson;
import com.gpower.modules.user.entity.User;
import com.gpower.modules.user.entity.UserGroup;
import com.gpower.modules.user.service.GroupService;
import com.gpower.modules.user.service.RolePermissonService;
import com.gpower.modules.user.service.UserGroupService;
import com.gpower.modules.user.service.UserService;
import com.gpower.modules.wx.util.StringUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @description:
 * @author: jingff
 * @date: 2019-07-11 10:47
 */
@Service("groupService")
public class GroupServiceImpl  extends ServiceImpl<GroupDao, Group> implements GroupService {

    @Autowired
    GroupDao  groupDao;
    @Autowired
    UserDao  userDao;
    @Autowired
    UserService  userService;

    @Autowired
    UserGroupService userGroupService;
    @Autowired
    UserGroupDao  userGroupDao;
    @Override
    public PageInfo queryPage(Map<String, Object> params,  Collection <String> allPermissions,
                            String  loginUsername) {
        List <String> collect=new ArrayList <>();

        if(allPermissions.contains("user")){//yuanji
            User user = userService.getOne(new QueryWrapper <User>().eq("name", loginUsername));
            List <UserGroup> userGrouplist = userGroupService.list(new QueryWrapper <UserGroup>().eq("userId", user.getId()));

           collect = userGrouplist.stream().map(UserGroup::getGroupId).collect(Collectors.toList());
            if(allPermissions.contains("role")){
                List <Group> groups = groupDao.selectList(new QueryWrapper <Group>());
               collect = groups.stream().map(Group::getId).collect(Collectors.toList());


            }
        }

        Query.setSorts(Arrays.asList("createtime", "name"));
        Query.setOrder("desc");

        String name = (String) params.get("groupName");
        String groupUser = (String) params.get("groupUser");
if(!StringUtils.isEmpty(groupUser)){
    List <Group> groupId = userGroupDao.findGroupId(groupUser);
    List <String> collect1 = groupId.stream().map(Group::getId).collect(Collectors.toList());
    collect.retainAll(collect1);

}
        String startCreateTime = (String) params.get("startCreateTime");
        String endCreateTime = (String) params.get("endCreateTime");
        LambdaQueryWrapper <Group> eq = new QueryWrapper <Group>().lambda().like(StrUtil.isNotBlank
                (name), Group::getName, name)  .gt(StrUtil.isNotBlank(startCreateTime),Group::getCreatetime,startCreateTime)
                .le(StrUtil.isNotBlank(endCreateTime),Group::getCreatetime,endCreateTime).in(collect.size()!=0,Group::getId, collect);


        IPage<Group> page = page(
                new Query<Group>(params).getPage(),eq

        );
        return new PageInfo(page);
    }

    @Override
    public boolean create(Group group) {
        group.setId(UUIDGenerator.getUUID());
        group.setCreatetime(new Date());
        int insert = groupDao.insert(group);

        return insert==1;
    }

    @Override
    public void delete(String id) {
        System.out.println("id----------"+id);
        groupDao.deleteById(id);

    }

    @Override
    public List<User> selectGroupUserById(String id) {
        return groupDao.selectGroupUserById(id);
    }

    @Override
    @Transactional(rollbackFor=Exception.class)
    public Group updateGroupUser(String groupID, String userID) {
        System.out.println("groupID--"+groupID);
        Group group = groupDao.selectById(groupID);
        if(group==null){
            throw new GpException("error.group.noexist");

        }
        String[] users = getGroupUserChange(groupID, userID);

        groupDao.deleteGroupUser(groupID);
        if(userID!=null && userID.length()>0){
            String[] userIdArray = userID.split(",");
            for (int i = 0; i < userIdArray.length; i++) {
                String curUserId = userIdArray[i];
                User user = userDao.selectById(curUserId);
                if(user==null){
                    continue;
                }
                groupDao.insertGroupUser(groupID, user.getId());

            }
        }



        return null;
    }

    @Override
    public Set <User> selectGroupbyUserId(String id) {
        List <Group> groups = groupDao.selectGroupbyUserId(id);

        Set <User> users=new HashSet <>();

        groups.forEach(gp->{
            List <User> user = groupDao.selectGroupUserById(gp.getId());
            users.addAll(user);
        });

        return users;
    }

    private String[] getGroupUserChange(String groupID, String userID){
        try {
            List<User> oldUserList= groupDao.selectGroupUserById(groupID);
            if((oldUserList==null || oldUserList.isEmpty()) && (userID==null || userID.trim().length()==0)){
                return null;
            }
            if(oldUserList==null){
                oldUserList = new ArrayList<User>();
            }
            if(userID==null){
                userID = "";
            }
            String[] userIDArray = StringUtil.split(userID, ",");

            List<String> oldUserIDList = new ArrayList<String>();
            oldUserList.stream().forEach(user ->{
                oldUserIDList.add(user.getId());
            });
            List<String> newUserIDList = Arrays.asList(userIDArray);
            //取交集
            List<String> intersectList = new ArrayList<String>(Arrays.asList(new String[oldUserIDList.size()]));
            Collections.copy(intersectList, oldUserIDList);
            intersectList.retainAll(newUserIDList);
            //取并集
            List<String> unionList =  new ArrayList<String>(Arrays.asList(new String[oldUserIDList.size()]));
            Collections.copy(unionList, oldUserIDList);
            unionList.addAll(newUserIDList);
            //取差集
            List<String> diffList = new ArrayList<String>(Arrays.asList(new String[unionList.size()]));
            Collections.copy(diffList, unionList);
            diffList.removeAll(intersectList);
            return diffList.toArray(new String[diffList.size()]);

        } catch (Exception e) {
            e.printStackTrace();
            if(userID==null){
                return null;
            }else{
                return StringUtil.split(userID, ",");
            }
        }
    }

}
