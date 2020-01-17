angular.module('MetronicApp').controller('WeixinCenterController', function ($rootScope, $scope, $http, $timeout, $state, pageUtil,gpPrompt) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.wechatPublicNumber = {};
    $scope.QueryCriteria = {};
    $scope.WxAccount={};

    $scope.WxAccountName={flag: true};
    $scope.ajaxWxAccount={};


    $scope.searchWxAccount = function () {
        $http({
            method: 'POST',
            url: 'wx/account/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.WxAccountList = response.data.page.list;
                console.log(" $scope.WxAccountList", $scope.WxAccountList)
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };




    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchWxAccount);
    $scope.WxAccount={};
    $scope.cmd = "create";
    $scope.newPublicNumber=function () {
        $scope.WxAccountName.flag=false;
        $scope.WxAccount={type:'-1',authentication:'-1'};
        $scope.wechatPublicNumber = {};
        $scope.formName = "新建微信公众号";
        $scope.cmd = "create";
     /*   $scope.wechatPublicNumber.flag = false;*/

        $("#weixinPublishNumber").modal("show");

    };

    $scope.deleteWxAccount=function(WxAccount){
        console.log("WxAccount",WxAccount);
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
           wid= WxAccount.id;
            $rootScope.loading = true;
            $http({
                method: "DELETE",
                url: "wx/account/" + wid
            }).then(function (response) {
                $rootScope.loading = false;
                $scope.searchWxAccount();
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
            }, function (response) {
                console.log(response);

            })
        })


    }
    $scope.sourceAccount = {};
    $scope.editWxAccount=function(WxAccount){

        var ta= WxAccount.type+"";
        var aa= WxAccount.authentication+"";
        console.log("$scope.WxAccount",$scope.WxAccount);
        $scope.WxAccountName.flag=false;
        $scope.WxAccount=WxAccount;
        $scope.WxAccount.type=ta;
        $scope.WxAccount.authentication=aa;
        $scope.sourceAccount =WxAccount;
       /* $scope.WxAccount={type:ta,authentication:aa};*/
        $scope.formName="编辑公众号";
        $scope.cmd="update";
        /*$scope.wechatPublicNumber.flag = false;*/
        $("#weixinPublishNumber").modal("show");


    }
    /*检查微信是否重名*/
    $scope.$watch("WxAccount.name", function (newValue, oldValue) {

        if ($scope.cmd === "update" && newValue === $scope.sourceAccount.name) {
            return;
        }
        if (newValue && newValue !== '') {

            $http({
                method: 'GET',
                url: 'wx/account/check/'+newValue
            }).then(function (response) {
                $scope.WxAccountName.flag = !response.data
            });
        }
    });



    $scope.forbiddenWxAccount=function(WxAccount){

        if(WxAccount.status==0){
            url1="wx/account/activeAccount/"+WxAccount.id;
        }else{
            url1="wx/account/desableAccount/"+WxAccount.id;
        }
        $http({
            method:"POST",
            url:url1,
        }).then(function (response) {
            $rootScope.loading = false;
            $scope.searchWxAccount();
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
            console.log(response);

        })


    }


    $scope.$on('$viewContentLoaded', function (event, data) {

        $scope.searchWxAccount();
        initValidateweixinPublishNumberForm();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });


    $scope. submitWxAccountForm=function () {


      if(!$("#weixinPublishNumberForm").valid()){
            return;
        }

        if ($scope.cmd === "create") {
            $scope.ajaxWxAccount=$scope.WxAccount;

            $http({
                method: 'POST',
                url: 'wx/account/create',
                data: $scope.ajaxWxAccount
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;
                $scope.searchWxAccount();
                $("#weixinPublishNumber").modal("hide");

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });

        }else if ($scope.cmd === "update") {
            $scope.ajaxWxAccount=$scope.WxAccount;

            $http({
                method: 'PUT',
                url: 'wx/account/update',
                data: $scope.ajaxWxAccount
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = true;
                $scope.searchWxAccount();
                $("#weixinPublishNumber").modal("hide");
            }, function (response) {
                alert("操作异常，请稍后重试！");
            });
        }


    }


    function initValidateweixinPublishNumberForm() {

        const weixinPublishNumberForm = $('#weixinPublishNumberForm');
        weixinPublishNumberForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                name: {
                    required: true
                },
                type: {
                    range:[1, 2],
                    required: true
                },
                authentication: {
                    range:[0,1] ,
                    required: true
                },
                originalId: {
                    required: true
                },
                appId: {
                    required: true
                },
                appSecret: {
                    required: true
                }

            },
            messages: {
                name: '用户名长度在10-16位',
                authentication:'是否认证必选',
                type:'帐号类型必选'

            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            }
        });
    }
});