angular.module('MetronicApp').controller('wxPublishtextController', function ( $stateParams,$rootScope,$state,$filter, $scope, settings, $http, gpPrompt, pageUtil) {

    $scope.message = {};
    $scope.editmessage={};
    $scope.id={};
    $scope.cmd = "new";
    var init1Time = new Date();
    $scope.initTime = {};
    var dateAsString = $filter('date')(init1Time, "yyyy-MM-dd HH:mm");
    console.log(dateAsString);
    $scope.initTime = dateAsString;

    $scope.message = {publishDate: new Date()};
    if( $stateParams.cmd=="edit"){
        $rootScope.publishWx=
            $scope.cmd = "edit";
        $scope.editmessage=$stateParams.data;
        $rootScope.publishWx=$scope.editmessage.wxAccountID;
        console.log("  $scope.editmessage",  $scope.editmessage);
        $scope.id=$scope.editmessage.id;
        $scope.message.content= $scope.editmessage.text.content;
        $scope.message.title=$scope.editmessage.text.title;
        $scope.message.publishDate=$scope.editmessage.publishDate;

    }

    if(!$rootScope.publishWx){

        $state.go("wxPublishSetting");
        gpPrompt.error({text:'请选择要发送文本的微信帐号'});
    }


    console.log(" $scope.initTime", $scope.initTime);
    $scope.$on('$viewContentLoaded', function (event, data) {

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });


    /*草稿*/
    $scope.saveForm = function () {
        if (!$scope.message.title) {
            cmsPrompt.error({text: "请输入发送标题"});
            return;
        }

        console.log("$scope.message.content", $scope.message.content);
        if (!$scope.message.content) {
            gpPrompt.error({text: "微信文本不能为空"});
            return;
        }
        if ($scope.message.publishDate < $scope.initTime) {
            gpPrompt.error({text: "日期不能小于当前时间"});
            return;
        }
        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'save',
            publishDate: $scope.message.publishDate,
            content: $scope.message.content,
            title:$scope.message.title
        });
        console.log("site");

    };
    /*提交审核*/
    $scope. submitAudit=function(){
        if (!$scope.message.title) {
            gpPrompt.error({text: "请输入文本标题"});
            return;
        }

        if (!$scope.message.content) {
            gpPrompt.error({text: "请输入文本内容"});
            return;
        }


        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.message.publishDate,
            content: $scope.message.content,
            title:$scope.message.title
        });
    }


    /*定时发送*/
    $scope.submitTimerForm = function () {
        if (!$scope.message.title) {
            cmsPrompt.error({text: "请输入发送标题"});
            return;
        }

        if (!$scope.message.content) {
            cmsPrompt.error({text: "请输入发送内容"});
            return;
        }
        if (!$scope.message.publishDate) {
            cmsPrompt.error({text: "请输入发送时间"});
            return;
        }
        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.message.publishDate,
            content: $scope.message.content,
            title:$scope.message.title
        });
    };
    /*立即发送*/
    $scope.submitForm = function () {
        if (!$scope.message.title) {
            cmsPrompt.error({text: "请输入发送标题"});
            return;
        }
        if (!$scope.message.content) {
            gpPrompt.error({text: "请输入发送内容"});
            return;
        }
        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: '',
            content: $scope.message.content,
            title:$scope.message.title
        });
    };
    $scope.doSubmitForm = function (data) {
        $scope.$broadcast("submitForm", data);
    };


    $scope.$on("submitForm", function (event, data) {

        if ("submit_new" == data.cmd) {
            $rootScope.loading = true;
            if (!$rootScope.publishWx) {
                gpPrompt.error({text: '请选择帐号'})
                return;
            }
            var array = new Array();
            array = $rootScope.publishWx;
            var starray = array.join(",");
            $http({
                url: "wx/content/" + starray + "/create",
                method: "POST",
                data: {
                    cmd: data.realCmd,
                    type: 1,
                    publishDate: data.publishDate,
                    content: data.content,
                    title: data.title
                },
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
                if (response.data.status == 0) {
                    gpPrompt.ok({text: response.data.msg});
                    window.history.go(-1);

                } else {
                    gpPrompt.error({text: response.data.msg})  ; window.history.go(-1);
                }
            });
        } else if ("submit_edit" == data.cmd) {

            $rootScope.loading = true;
            $http({
                url: "wx/content/" + starray + "/update",
                method: "POST",
                data: {
                    cmd: data.realCmd,
                    type: 1,
                    publishDate: data.publishDate,
                    content: data.content,
                    title: data.title,
                    id: $scope.id
                },
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
                if (response.data.status == 0) {
                    gpPrompt.ok({text: response.data.msg});
                    window.history.go(-1);

                } else {
                    gpPrompt.error({text: response.data.msg});
                    window.history.go(-1);
                }


            })
        }

    });
});