angular.module('MetronicApp').controller('userGroupController', function ($rootScope,$state, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.grouppageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.groupName = {"flag": true};
    $scope.roles = [
        {name:'普通用户', id:'156b070885f146f2b3afc084ea0cff67'},
        {name:'院级管理员', id:'5b6b6f10dd2042ffaa78da84711f3230'},
        {name:'实施用户', id:'9db925d719a14be496177863754ba4f8'}
    ];
    $scope.getuserrole=function(roleid){
        $scope.rolea='';
        angular.forEach( $scope.roles,function(obj,index) {
       if(obj.id==roleid){
           $scope.rolea= obj.name;

       }

        });
        return  $scope.rolea;

    }
    $scope.userName = {"flag": true};
    $scope.user = {repassword: ""};
    /*$scope.user.role='156b070885f146f2b3afc084ea0cff67';*/
    $scope.ajaxUser = {};

    $scope.groupList={};
    $scope.group={};



    $scope.viewGroup=true;
    $scope.viewUser=false;



    $scope.viewAllGroup=function () {
        $scope.pageConf = {currentPage: 1, pageSize: 10};
        //    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchGroups);
        $scope.searchGroups();
        $scope.viewGroup=true;
        $scope.viewUser=false;

    }

    $scope.viewAllUser=function () {
        $scope.searchUsers();
        $scope.viewGroup=false;
        $scope.viewUser=true;
    }

    $scope.searchGroups = function () {
        console.log(" $scope.pageConf)", $scope.pageConf);
        $http({
            method: 'POST',
            url: 'group/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.grouppageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.groupList = response.data.page.list;
                console.log(" $scope.groupList ", $scope.groupList );
                pageUtil.setResponsePageConf($scope.grouppageConf, response.data.page);
                console.log(" $scope.pageConf ", $scope.pageConf );
                console.log(" response.data.page ", response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };
    var  systemUser=new Array();
    $http({
        method:'GET',
        url:'user/system'
    }).then(function (response) {
        if (response.data.status === 0) {
            $scope.sysuserList = response.data.object;
            console.log("$scope.sysuserList",$scope.sysuserList);
            systemUser=  $scope.sysuserList;
        }else{
            gpPrompt.error({text: response.data.msg});
        }
    })

    $scope.hahha='';


    $scope.preview=function (data) {
        $("#preview-msg").modal('show');


    }


    $scope.findSyStem=function(index){

        for (var prop in systemUser) {

            if (systemUser.hasOwnProperty(index)) {

                return   systemUser[index].name;
            }
        }

    }




    $scope.searchUserList=function(){
        $http({
            method: 'POST',
            url: 'user/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.userList = response.data.page.list;
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {

        });
    };


    $scope.searchGroupList=function(){
        console.log("$scope.QueryCriteria",$scope.QueryCriteria);
        $http({
            method: 'POST',
            url: 'group/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.grouppageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.groupList = response.data.page.list;
                pageUtil.setResponsePageConf($scope.grouppageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {

        });


    }
    $scope.allwxName='';
    $scope.ownwxName='';



    $scope.weiboshouquan=function(user){


        $scope.groupName = user.name;
        $scope.shouquanuserid=user.id;


        $("#weibogroupModal").modal('show');
        $http({
            method:'GET',
            url:'wb/account/all/'+user.id
        }).then(function(response){

            if(response.data.status===0){
                $scope.wball = response.data.object;
                console.log("$scope.wxall ",$scope.wball );
            }else{
                gpPrompt.error({text:response.data.msg});
            }})


    }

    $scope.weixinshouquan=function(user){


        $scope.groupName = user.name;
        $scope.shouquanuserid=user.id;


        $("#weixingroupModal").modal('show');
        $http({
            method:'GET',
            url:'wx/account/all/'+user.id
        }).then(function(response){

            if(response.data.status===0){
                $scope.wxall = response.data.object;
                console.log("$scope.wxall ",$scope.wxall );
            }else{
                gpPrompt.error({text:response.data.msg});
            }})


    }

    $scope.addOrUpdateUser=function(group){
        $scope.groupName = group.name;
        $scope.user = {id:""};
        $scope.groupID = group.id;
        $("#groupUserModal").modal('show');
        $http({
            method:"GET",
            url:"group/getGroupUsers/"+$scope.groupID
        }).then(function(response){
            console.log(response);
            if(response.data.status===0){
                $scope.userList = response.data.object;
                console.log("$scope.userList ",$scope.userList );
            }else{
                gpPrompt.error({text:response.data.msg});
            }

        });

    }

    $scope.unSelectUser = function(user){
        user.status = 0;
    };

    $scope.unSelectRole = function(role){
        role.status = 0;
    };
    $scope.unSelectwx = function(sqwx){
        sqwx.tempstatus=0;
    };

    $scope.unSelectwb = function(sqwb){
        sqwb.tempstatus=0;
    };
    $scope.selectUser = function(user){
        user.status = 1;
    };
    $scope.selectsqwx=function(sqwx){
        sqwx.tempstatus=1;
    }
    $scope.selectsqwb=function(sqwb){
        sqwb.tempstatus=1;
    }

    $scope.selectRole = function(role){
        role.status = 1;
    };
    $scope.removeAllUser = function(userList){
        angular.forEach(userList, function(data,index,array){
            data.status = 0;
        });
    };
    $scope.addAllWx = function(wxalls){
        angular.forEach(wxalls, function(data,index,array){
            data.tempstatus = 1;
        });
    };
    $scope.addAllWb = function(wballs){
        angular.forEach(wballs, function(data,index,array){
            data.tempstatus = 1;
        });
    };
    $scope.removeAllWb = function(wballs){
        angular.forEach(wballs, function(data,index,array){
            data.tempstatus = 0;
        });
    };
    $scope.removeAllWx = function(wxalls){
        angular.forEach(wxalls, function(data,index,array){
            data.tempstatus = 0;
        });
    };



    $scope.removeAllRole = function(roleList){
        angular.forEach(roleList, function(data,index,array){
            data.status = 0;
        });
    };
    $scope.addAllUser = function(userList){
        angular.forEach(userList, function(data,index,array){
            data.status = 1;
        });
    };

    $scope.addAllRole = function(roleList){
        angular.forEach(roleList, function(data,index,array){
            data.status = 1;
        });
    };

    $scope.updateUserRole=function(){
        var choosedRoleIDArray = [];
        angular.forEach($scope.myRoleList, function(data,index,array){
            if(data.status==1){
                choosedRoleIDArray.push(data.id);
            }
            var choosedRoleIDstr = choosedRoleIDArray.join(",");
            if(!(choosedRoleIDstr)){
                $rootScope.loading = true;
                $http({
                    method: 'POST',
                    url: 'user/grantRole/' + $scope.userID,
                    data: choosedRoleIDArray
                }).then(function (response) {
                    $rootScope.loading = false;
                    $("#userRoleModal").modal("hide");
                    if (response.data.status === 0) {
                        gpPrompt.ok({text: response.data.msg});
                    } else {
                        gpPrompt.error({text: response.data.msg});
                    }
                }, function (response) {    // 带有错误信息的resp
                    console.log(response);
                });
            }else{
                $rootScope.loading = true;
                $http({
                    method: 'POST',
                    url: 'user/grantRole/' + $scope.userID,
                    data: choosedRoleIDArray
                }).then(function (response) {
                    $rootScope.loading = false;
                    $("#userRoleModal").modal("hide");
                    if (response.data.status === 0) {
                        gpPrompt.ok({text: response.data.msg});
                    } else {
                        gpPrompt.error({text: response.data.msg});
                    }
                }, function (response) {    // 带有错误信息的resp
                    console.log(response);
                });

            }
        });

    }


    $scope.updateShouquanWb=function(){

        var choosedUserIDArray = [];


        angular.forEach($scope.wball, function(data,index,array){
            if(data.tempstatus==1){
                choosedUserIDArray.push(data.id);
            }
        });

        var choosedUserIDStr = choosedUserIDArray.join(",");

        $rootScope.loading = true;
        console.log( $scope.shouquanuserid);


        $http({
            method: "POST",
            url: "wb/account/updateshouquanUser",
            data: {userID: $scope.shouquanuserid, wxids: choosedUserIDStr},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function (response) {
            $rootScope.loading = false;
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
                $("#weibogroupModal").modal('hide');

            } else {
                gpPrompt.error({text: response.data.msg});
            }
        });

    }
$scope.updateShouquanWx=function(){

    var choosedUserIDArray = [];


    angular.forEach($scope.wxall, function(data,index,array){
        if(data.tempstatus==1){
            choosedUserIDArray.push(data.id);
        }
    });

    var choosedUserIDStr = choosedUserIDArray.join(",");

        $rootScope.loading = true;
        console.log( $scope.shouquanuserid);


        $http({
            method: "POST",
            url: "wx/account/updateshouquanUser",
            data: {userID: $scope.shouquanuserid, wxids: choosedUserIDStr},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function (obj) {
                var str = [];
                for (var p in obj) {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function (response) {
            $rootScope.loading = false;
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
                $("#weixingroupModal").modal('hide');

            } else {
                gpPrompt.error({text: response.data.msg});
            }
        });

}


    $scope.updateGroupUser = function(){
        var choosedUserIDArray = [];
        angular.forEach($scope.userList, function(data,index,array){
            if(data.status==1){
                choosedUserIDArray.push(data.id);
            }
        });
        var choosedUserIDStr = choosedUserIDArray.join(",");
        if(!(choosedUserIDStr)){
            /*  gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {*/
            /*gpPrompt.confirm({text:"确认取消所有用户吗？",yes:function(){*/
            $rootScope.loading = true;
            $http({
                method: "POST",
                url: "group/updateGroupUser",
                data: {groupID: $scope.groupID, userID: choosedUserIDStr},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (obj) {
                    var str = [];
                    for (var p in obj) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(function (response) {
                $rootScope.loading = false;
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                    $("#groupUserModal").modal('hide');
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
            });
            /*}   )*/
        }else{

            $rootScope.loading = true;
            console.log("$scope.groupID",$scope.groupID);
            console.log("userID",choosedUserIDStr);
            $http({
                method:"POST",
                url:"group/updateGroupUser",
                data:{groupID:$scope.groupID,userID:choosedUserIDStr},
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(function(response){

                $rootScope.loading = false;
                console.log("response.data.status",response.data.status);
                if(response.data.status===0){
                    gpPrompt.ok({text:response.data.msg});
                    $("#groupUserModal").modal('hide');
                }else{
                    gpPrompt.error({text:response.data.msg});
                }
            });
        }

    };


    $scope.searchUsers = function () {
        $http({
            method: 'POST',
            url: 'user/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.userList = response.data.page.list;
                console.log(   $scope.userList);
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };
    $scope.getUserInfo = function (user) {
        $http({
            method: "GET",
            url: "user/info/" + user.id
        }).then(function (response) {
            $scope.userDetail = response.data.object;
            $("#userInfoViewModal").modal("show");
            $rootScope.loading = false;
        }, function (response) {
            console.log(response);
        })
    };



    $scope.userRoleList = [];
    $scope.showUserRole=function(user){
        $scope.userRoleList = [];
        $scope.currentUser = user;
        $scope.myRole = {id:""};
        $scope.userID = user.id;
        $("#userRoleModal").modal('show');
        $http({
            method: 'GET',
            url: 'user/' + $scope.userID + '/roles'
        }).then(function (response) {
            console.log(response.data);
            $scope.myRoleList = response.data.object;
            console.log(" $scope.myRoleList", $scope.myRoleList);
        })
    };



    // 更新个人信息
    $scope.upUserDetail = function () {
        $http({
            method: 'PUT',
            url: 'user/info',
            data: $scope.userDetail
        }).then(function (response) {
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
            } else {
                gpPrompt.error({text: response.data.msg});
            }
            $scope.searchUsers();
            $("#userInfoViewModal").modal("hide");
        }, function (response) {
            alert("操作异常，请稍后重试！");
        });
        $scope.userDetail = {};
    };


    $scope.$watch("user.name", function (newValue, oldValue) {

        if ($scope.cmd === "update" && newValue === $scope.sourceUser.name) {
            return;
        }
        if (newValue && newValue !== '') {
            $http({
                method: 'GET',
                url: 'user/' + newValue + "/check"
            }).then(function (response) {
                $scope.userName.flag = !response.data
            });
        }
    });

    $scope.$watch("group.name", function (newValue, oldValue) {

        if ($scope.cmd === "update" && newValue === $scope.sourceGroup.name) {
            return;
        }
        if (newValue && newValue !== '') {
            $http({
                method: 'GET',
                url: 'group/' + newValue + "/check"
            }).then(function (response) {
                $scope.groupName.flag = !response.data
            });
        }
    });
    $scope.cmd = "create";

    $scope.newUser = function () {
        $scope.user = {role:'156b070885f146f2b3afc084ea0cff67'};
        $scope.formName = "新建用户";
        $scope.cmd = "create";
        $scope.userName.flag = false;
        $("#userModal").modal("show");
    };

    $scope.newGroup = function () {
        $scope.group = {};
        $scope.formName = "新建用户组";
        $scope.cmd = "create";
        $scope.groupName.flag = false;
        $("#groupModal").modal("show");
    };

    $scope.sourceGroup = {};
    $scope.sourceUser = {};

    $scope.editUser = function (user) {

        console.log(user);
        $scope.user = user;
        $scope.user.role=user.role;
        $scope.user.password = user.password;
        $scope.user.repassword =  user.password;
        $scope.sourceUser = user;
        $scope.formName = "修改密码";
        $scope.cmd = "update";
        $scope.userName.flag = false;
        $("#userModal").modal("show");
    };
    $scope.viewUserInfo = function (user) {
        $scope.isSearch = false;
        $scope.getUserInfo(user);
    };

    $scope.searchUser = function () {
        $scope.userDetail = {};
        $scope.isSearch = true;
        $("#userInfoViewModal").modal("show");
    };


    $scope.editGroup = function (group) {
        $scope.group = group;

        $scope.sourceGroup = group;
        $scope.formName = "修改用户组";
        $scope.cmd = "update";
        $scope.groupName.flag = false;
        $("#groupModal").modal("show");
    };

    $scope.deleteUser = function (user) {
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
            uid = user.id;
            $rootScope.loading = true;
            $http({
                method: "DELETE",
                url: "user/" + uid
            }).then(function (response) {
                $rootScope.loading = false;
                $scope.searchUsers();
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
            }, function (response) {
                console.log(response);

            })
        })
    };



    $scope.deleteGroup= function (group) {
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
            uid = group.id;
            $rootScope.loading = true;
            $http({
                method: "DELETE",
                url: "group/" + uid
            }).then(function (response) {
                $rootScope.loading = false;
                $scope.searchGroups();
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
            }, function (response) {
                console.log(response);

            })
        })
    };

    $scope.submitUserForm = function () {

        console.log($scope.user);
     if (!$("#userForm").valid()) {
            return;
        }    console.log(    $scope.user);
           if ($scope.cmd === "create") {

            console.log(    $scope.user);
            $scope.user.password = hash($scope.user.password);
            $scope.ajaxUser.name = $scope.user.name;
            $scope.ajaxUser.role = $scope.user.role;
            $scope.ajaxUser.fullName = $scope.user.fullName;
            $scope.ajaxUser.password = $scope.user.password;
            $http({
                method: 'POST',
                url: 'user',
                data: $scope.ajaxUser
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;
                $scope.searchUsers();
                $("#userModal").modal("hide");
                $scope.user.repassword = "";
            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });
        } else if ($scope.cmd === "update") {
            $scope.user.password = hash($scope.user.password);
            $scope.user.repassword = hash($scope.user.password);
               $scope.ajaxUser.role=$scope.user.role;
            $scope.ajaxUser.name = $scope.user.name;
            $scope.ajaxUser.password = $scope.user.password;
            $scope.ajaxUser.id = $scope.user.id;
            console.log($scope.ajaxUser);
            $http({
                method: 'PUT',
                url: 'user/update/password',
                data: $scope.ajaxUser
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = true;
                $scope.searchUsers();
                $("#userModal").modal("hide");
            }, function (response) {
                alert("操作异常，请稍后重试！");
            });
        }
    };

    $scope.ajaxgroup={};
    $scope.submitGroupForm = function () {

        if (!$("#groupForm").valid()) {
            return;
        }
        if ($scope.cmd === "create") {

            $scope.ajaxgroup.name = $scope.group.name;
            $scope.ajaxgroup.description = $scope.group.description;
            $http({
                method: 'POST',
                url: 'group',
                data: $scope.ajaxgroup
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;
                $scope.searchGroups();
                $("#groupModal").modal("hide");

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });
        } else if ($scope.cmd === "update") {
            $scope.ajaxgroup.name = $scope.group.name;
            $scope.ajaxgroup.description = $scope.group.description;
            $scope.ajaxgroup.id = $scope.group.id;
            console.log(" $scope.ajaxgroup", $scope.ajaxgroup);
            $http({
                method: 'PUT',
                url: 'group/update',
                data: $scope.ajaxgroup
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = true;
                $scope.searchGroups();
                $("#groupModal").modal("hide");
            }, function (response) {
                alert("操作异常，请稍后重试！");
            });
        }
    };


    $scope.$watch('grouppageConf.currentPage+grouppageConf.pageSize', $scope.searchGroups);

    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchUsers);




    $scope.$on('$viewContentLoaded', function (event, data) {



        $scope.searchGroups();
        $scope.searchUsers();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });
    // 表单验证
    function initValidateGroupForm() {
        const groupForm = $('#groupForm');
        groupForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                name: {
                    rangelength: [3, 16],
                    required: true
                }
            },
            messages: {
                name: '用户组名长度在3-16位'

            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
        });
    }

    // 表单验证
    function initValidateUserForm() {
        const userForm = $('#userForm');
        userForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                name: {
                    rangelength: [3, 16],
                    required: true
                },
                fullname:{
                    rangelength: [3, 16],
                    required: true
                },
                role:{
                    required: true
                },
                password: {
                    noChinese: true,
                    minlength: 5,
                    required: true
                },
                confirmPassword: {
                    noChinese: true,
                    minlength: 5,
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                role: '请选择角色',
                name: '用户名长度在3-16位',
                fullname:'请填写姓名',
                password: '最少为5位',
                confirmPassword: '两次输入的密码不一致'
            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            },
        });
    }
    $scope.$watch('hahha',function(newValue, oldValue){
        console.log("$scope.wbPublish",$scope.hahha);

        /*if(newValue && newValue!=oldValue && $scope.wbPublish.image!=null){
            if((typeof newValue)=="object"){
                console.log("selectedNews.thumbImage",$scope.wbPublish.image);
                $scope.doSubmitForm({cmd:'uploadwbimg',file:$scope.wbPublish.image});
            }
        }*/

    });


})