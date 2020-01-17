angular.module('MetronicApp').controller('RoleController', function ($rootScope, $scope, settings, $http, pageUtil, gpPrompt) {
    $scope.pageConf = {currentPage: 1, pageSize: 5};
    $scope.roleCodeRepeat = false;
    $scope.QueryCriteria = {};
    $scope.sourceRole = {};
    $scope.role = {};
    $scope.grantRole = {};
    $scope.cmd = "create";

    $scope.searchRoles = function () {
        $http({
            method: 'POST',
            url: 'role/page',
            data: pageUtil.getQueryData({}, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.roleList = response.data.page.list;
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };

    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchRoles);

    $scope.newRole = function () {
        $scope.cmd = "create";
        $scope.role = {};
        $scope.formName = "新建角色";
        $scope.getAllPermissions();
        $scope.rolePermissionList = [];
        $("#roleModal").modal("show");
    };

    $scope.editRole = function (role) {
        $scope.cmd = "update";
        $scope.role = role;
        $scope.sourceRoleCode = role.code;
        $scope.formName = "编辑角色";
        $scope.getRolePermissions(role);
        $("#roleModal").modal("show");
    };

    $scope.$watch("role.code", function (newValue, oldValue) {
        if ($scope.cmd === "update" && newValue === $scope.sourceRoleCode) {
            return;
        }
        if (newValue && newValue !== '') {
            $http({
                method: 'GET',
                url: 'role/' + newValue + "/check"
            }).then(function (response) {
                $scope.roleCodeRepeat = !response.data
            });
        }
    });

    $scope.rolePermissionList = [];

    $scope.getRolePermissions = function (role) {
        $http({
            method: 'GET',
            url: 'role/' + role.id + '/permissions',
        }).then(function (response) {
            $scope.rolePermissionList = response.data;
            $scope.getAllPermissions();
        }, function (response) {
            console.log(response);
        });
    };

    $scope.deleteRole = function (role) {
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
                $rootScope.loading = true;
                $http({
                    method: "DELETE",
                    url: "role/" + role.id
                }).then(function (response) {
                    $rootScope.loading = false;
                    if (response.data.status === 0) {
                        gpPrompt.ok({text: response.data.msg});
                    } else {
                        gpPrompt.error({text: response.data.msg});
                    }
                    $scope.searchRoles();
                }, function (response) {
                    console.log(response);
                });
            }
        );
    };

    $scope.submitRoleForm = function () {
        if (!$("#roleForm").valid()) {
            return;
        }

        var permissionIds = [];
        for (var i = 0; i < $scope.permissionList.length; i++) {
            var permission = $scope.permissionList[i];
            if (permission.checked) {
                permissionIds.push(permission.id);
            }
        }
        if ($scope.cmd === "create") {
            $http({
                method: 'POST',
                url: 'role/' + $scope.role.name + '/' + $scope.role.code,
                data: permissionIds
            }).then(function (response) {
                $rootScope.loading = false;
                $("#roleModal").modal("hide");
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $scope.searchRoles();
            }, function (response) {
                console.log(response);
            });
        } else if ($scope.cmd === "update") {
            $http({
                method: 'PUT',
                url: 'role/' + $scope.role.id + '/' + $scope.role.name + '/' + $scope.role.code,
                data: permissionIds
            }).then(function (response) {
                $rootScope.loading = true;
                $("#roleModal").modal("hide");
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $scope.searchRoles();
            }, function (response) {
                console.log(response);
            });
        }
    };

    $scope.doPermissionList = function (permissionList) {
        $scope.permissionList = [];
        for (var i = 0; i < permissionList.length; i++) {
            var permission = permissionList[i];
            permission.checked = false;
            for (var j = 0; j < $scope.rolePermissionList.length; j++) {
                var rolePermission = $scope.rolePermissionList[j];
                if (permission.id === rolePermission.id) {
                    permission.checked = true;
                }
            }
            $scope.permissionList.push(permission);
        }
    };

    $scope.getAllPermissions = function () {
        $http({
            method: 'GET',
            url: 'permission/all'
        }).then(function (response) {
            $scope.doPermissionList(response.data);
        }, function (response) {
            console.log(response);
        });
    };


    $scope.clickPermission = function (permission) {
        permission.checked = !permission.checked;
    };

    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.searchRoles();
        initValidateRoleForm();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

    // 表单验证
    function initValidateRoleForm() {
        const roleForm = $('#roleForm');
        roleForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                name: {
                    rangelength: [3, 16],
                    required: true
                },
                code: {
                    noChinese: true,
                    rangelength: [3, 16],
                    required: true
                }
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
