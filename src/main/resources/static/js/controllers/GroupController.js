angular.module('MetronicApp').controller('GroupController', function ($rootScope, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.groupName = {"flag": true};
    $scope.groupList={};
    $scope.group={};

    $scope.searchGroups = function () {
        $http({
            method: 'POST',
            url: 'group/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.groupList = response.data.page.list;
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };

    $scope.cmd = "create";

    $scope.newGroup = function () {
        $scope.group = {};
        $scope.formName = "新建用户组";
        $scope.cmd = "create";
        $scope.groupName.flag = false;
        $("#groupModal").modal("show");
    };

    $scope.sourceGroup = {};

    $scope.editGroup = function (group) {
        $scope.group = group;

        $scope.sourceGroup = group;
        $scope.formName = "修改用户组";
        $scope.cmd = "update";
        $scope.groupName.flag = false;
        $("#groupModal").modal("show");
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

    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchGroups);


    $scope.$on('$viewContentLoaded', function (event, data) {

        $scope.searchGroups();
        initValidateGroupForm();
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

})