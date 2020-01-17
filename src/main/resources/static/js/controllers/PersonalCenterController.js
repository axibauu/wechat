angular.module('MetronicApp').controller('PersonalCenterController', function ($rootScope, $scope, $http, $timeout, $state, gpPrompt) {
    $scope.updateData = {
        id: null,
        password: null,
        oldPassword: null
    };

    $scope.upUserInfo = function () {
        if (!$("#updateUserInfoForm").valid()) {
            return;
        }
        $rootScope.loginUserInfo.id = $rootScope.loginUser.id;
        $http({
            method: 'POST',
            url: 'userInfo',
            data: $rootScope.loginUserInfo
        }).then(function (response) {
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };

    $scope.upUserPassword = function () {
        if (!$("#updateUserPasswordForm").valid()) {
            return;
        }
        $scope.updateData.id = $scope.loginUser.id;
        $scope.updateData.oldPassword = hash($scope.updateData.oldPassword);
        $scope.updateData.password = hash($scope.updateData.password);
        $scope.updateData.confirmPassword = hash($scope.updateData.confirmPassword);
        $http({
            method: 'POST',
            url: 'user/password',
            data: $.param($scope.updateData),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
            } else {
                gpPrompt.error({text: response.data.msg});
            }
            $scope.updateData = {
                id: null,
                password: null,
                oldPassword: null
            };
        }, function (response) {
        });
    };

    $scope.getLoginUserInfo = function () {
        $http({
            method: 'GET',
            url: 'userInfo/current'
        }).then(function (response) {
            $rootScope.loginUserInfo = response.data.object;
        }, function (response) {
            console.log(response);
        });
    };

    $scope.$on('$viewContentLoaded', function (event, data) {
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = true;
        $scope.getLoginUser();
        $scope.getLoginUserInfo();
        initValidateUpdateUserPasswordForm();
        initValidateUpdateUserInfoForm();
    });

    // 修改密码表单验证
    function initValidateUpdateUserPasswordForm() {
        const updateUserPasswordForm = $('#updateUserPasswordForm');
        updateUserPasswordForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                old_password: {
                    required: true
                },
                password: {
                    minlength: 5,
                    required: true
                },
                confirmPassword: {
                    minlength: 5,
                    required: true,
                    equalTo: "#password"
                }
            },
            messages: {
                old_password: '最少为5位',
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

    // 修改个人信息表单验证
    function initValidateUpdateUserInfoForm() {
        const updateUserInfoForm = $('#updateUserInfoForm');
        updateUserInfoForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                phone: {
                    phoneNum: true,
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