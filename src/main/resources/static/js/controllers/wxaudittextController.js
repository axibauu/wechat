angular.module('MetronicApp').controller('wxaudittextController', function ( $stateParams,$rootScope,$state,$filter, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.message = {};
    $scope.editmessage={};
    $scope.id={};
    $scope.cmd = "audit";
    var init1Time = new Date();
    $scope.initTime = {};
    var dateAsString = $filter('date')(init1Time, "yyyy-MM-dd HH:mm");
    console.log(dateAsString);
    $scope.initTime = dateAsString;
    $scope.audit={};
    $scope.message = {publishDate: new Date()};
    if( $stateParams.cmd=="audit"){

        $scope.editmessage=$stateParams.data;
        $rootScope.publishWx=$scope.editmessage.wxAccountID;
        $scope.audit.createDate=$scope.editmessage.createDate;
        console.log("  $rootScope.publishWx",   $rootScope.publishWx);
        $scope.id=$scope.editmessage.id;
        $scope.message.content= $scope.editmessage.text.content;
        $scope.message.title=$scope.editmessage.text.title;
        $scope.message.publishDate=$scope.editmessage.publishDate;

    }

    /*审核通过*/
    $scope.auditpass=function(){
        $scope.audit.tempstatus=4;

        $http({
            method:"POST",
            url:"wx/content/"+  $rootScope.publishWx+"/audit",
            data:{status: $scope.audit.tempstatus,id:$scope.id},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            transformRequest: function(obj) {
                var str = [];
                for(var p in obj){
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
                return str.join("&");
            }
        }).then(function (response) {
            if (response.data.status === 0) {
                console.log("aaa");
                gpPrompt.ok({text: response.data.msg});
                window.history.go(-1);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        })

    };


    $scope.Reject=function() {

        $scope.formName = "退回文本";
        $("#weixinPublishNumber").modal("show");

    };
    $scope.submitWxtextContentForm=function(){
        $('.modal-backdrop').remove();
        $("#weixinPublishNumber").modal("hide");
    $scope.audit.tempstatus=2;
    console.log("$scope.id"+$scope.id);
    $http({
        method:"POST",
        url:"wx/content/"+  $rootScope.publishWx+"/audit",
        data:{status:$scope.audit.tempstatus,id:$scope.id,content:$scope.audit.content},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj){
                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            }
            return str.join("&");
        }
    }).then(function (response) {
        if (response.data.status === 0) {
            console.log("aaa");
            gpPrompt.ok({text: response.data.msg});
            window.history.go(-1);
        } else {
            gpPrompt.error({text: response.data.msg});
        }
    })

    }

    $scope.preview=function (data) {
        $scope.previewText=data;
        /*   $scope.account=*/
        console.log($scope.previewText,"$scope.previewText");



        $scope.previewShowList=false;

        $("#wxaccountname").html($scope.previewText.wxAccount.name);
        $("#tab_info_content").html($scope.previewText.text.content);
        $("#preview-msg").modal('show');

    }



    $scope.$on('$viewContentLoaded', function (event, data) {

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

});