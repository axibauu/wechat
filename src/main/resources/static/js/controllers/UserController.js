/* Setup general page controller */
angular.module('MetronicApp').controller('UserController', function ($rootScope, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.userName = {"flag": true};
    $scope.user = {"repassword": ""};
    $scope.ajaxUser = {};
    $scope.userDetail = {};
    $scope.allRoleList = [];
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


    //================================================

    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchUsers);

    $scope.user = {};

    $scope.cmd = "create";

    $scope.newUser = function () {
        $scope.user = {role:'156b070885f146f2b3afc084ea0cff67'};
        $scope.formName = "新建用户";
        $scope.cmd = "create";
        $scope.userName.flag = false;
        $("#userModal").modal("show");
    };

    $scope.sourceUser = {};

    $scope.editUser = function (user) {
        $scope.user = user;
        $scope.user.password = '';
        $scope.user.repassword = '';
        $scope.sourceUser = user;
        $scope.formName = "修改密码";
        $scope.cmd = "update";
        $scope.userName.flag = false;
        $("#userModal").modal("show");
    };
    $scope.getuserrole=function(roleid){
        $scope.rolea='';
        angular.forEach( $scope.roles,function(obj,index) {
            if(obj.id==roleid){
                $scope.rolea= obj.name;

            }

        });
        return  $scope.rolea;

    }
    $scope.viewUserInfo = function (user) {
        $scope.isSearch = false;
        $scope.getUserInfo(user);
    };



    $scope.searchUser = function () {
        $scope.userDetail = {};
        $scope.isSearch = true;
        $("#userInfoViewModal").modal("show");
    };

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

    $scope.submitUserForm = function () {
        if (!$("#userForm").valid()) {
            return;
        }
        if ($scope.cmd === "create") {
            $scope.user.password = hash($scope.user.password);
            $scope.ajaxUser.name = $scope.user.name;
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
            $scope.ajaxUser.name = $scope.user.name;
            $scope.ajaxUser.password = $scope.user.password;
            $scope.ajaxUser.id = $scope.user.id;
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

    $scope.showUserRole = function (user) {
        $rootScope.loading = false;
        $scope.grantUser = user;
        $scope.getUserRoles();
        $("#userRoleModal").modal("show");
    };

    $scope.doRoleList = function (roleList) {
        $scope.roleList = [];
        for (var i = 0; i < roleList.length; i++) {
            var role = roleList[i];
            role.checked = false;
            for (var j = 0; j < $scope.userRoleList.length; j++) {
                var userRole = $scope.userRoleList[j];
                if (role.id === userRole.id) {
                    role.checked = true;
                }
            }
            $scope.roleList.push(role);
        }
    };

    $scope.getAllRoles = function () {
        $http({
            method: 'GET',
            url: 'role/all'
        }).then(function (response) {
            $scope.allRoleList = response.data;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.userRoleList = [];

    $scope.getUserRoles = function () {
        $scope.userRoleList = [];
        $http({
            method: 'GET',
            url: 'user/' + $scope.grantUser.id + '/roles'
        }).then(function (response) {
            $scope.userRoleList = response.data;
            console.log(" $scope.userRoleList", $scope.userRoleList);

            $scope.doRoleList($scope.allRoleList);
        }, function (response) {
            console.log(response);
        });
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
    $scope.grantUserRole = function () {
        var roleIds = [];
        for (var i = 0; i < $scope.roleList.length; i++) {
            var role = $scope.roleList[i];
            if (role.checked) {
                roleIds.push(role.id)
            }
        }
        $rootScope.loading = true;
        $http({
            method: 'POST',
            url: 'user/grantRole/' + $scope.grantUser.id,
            data: roleIds
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
    };

    $scope.clickRole = function (role) {
        role.checked = !role.checked;
    };

    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.getAllRoles();
        $scope.searchUsers();
        initValidateUserForm();

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

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
                name: '用户名长度在3-16位',
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
});
