angular.module('MetronicApp').controller('wbauditController', function ( $stateParams,$rootScope,$state,$filter,$timeout, $scope, settings, $http, gpPrompt, pageUtil) {

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
        console.log("  $scope.editmessage",   $scope.editmessage);
        $scope.publishWb=$scope.editmessage.wbAccount.id;
        console.log("  $rootScope.publishWb",   $scope.publishWb);
        $scope.id=$scope.editmessage.id;

        var time=$scope.editmessage.creationDate;
        $scope.audit.id=$scope.editmessage.id;
        $scope.audit.createDate=$filter('date')(time, "yyyy-MM-dd");
        $scope.audit.name=$scope.editmessage.wbAccount.name;
        $scope.audit.content=$scope.editmessage.content;

        $scope.audit.imgurl=$scope.editmessage.imgurl;
        $scope.editimageurl="storage/wbimage/"+$scope.publishWb+"/"+$scope.audit.imgurl;
        $scope.audit.reason='';



    }



    /*审核通过*/
    $scope.auditpass=function(data){
        $scope.audit.tempstatus='4';
        $http({
            method:"POST",
            url:"wb/content/auditUpdate/"+data.id,
            data:{status: $scope.audit.tempstatus},
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

        $state.go("wbPublishSetting");
             /*   $scope.searchauditWeibo();
                $scope.searchdraflist();
                $scope.viewhasshenhe();*/

            } else {
                gpPrompt.error({text: response.data.msg});
            }
        })

    };

    $scope.Reject=function(data){

            $scope.formName = "退回微博";
            $("#wbPublishNumber").modal("show");

    };

    $scope.submitWbContentForm=function(){
         $scope.audit.tempstatus="0";
               console.log(  $scope.audit);
               $http({
                   method:"POST",
                   url:"wb/content/auditUpdate/"+ $scope.audit.id,
                   data:{status: $scope.audit.tempstatus,reason:$scope.audit.reason},
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

                       $("#wbPublishNumber").modal("hide");
                       gpPrompt.ok({text: response.data.msg});
                       $timeout(function () {
                           window.history.go(-1);
                       },1000)
                      //
                   } else {
                       gpPrompt.error({text: response.data.msg});
                   }
               })

    }


   /* $scope.submitWxtextContentForm=function() {
        $('.modal-backdrop').remove();

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
                $("#weixinPublishNumber").modal("hide");
                gpPrompt.ok({text: response.data.msg});

                window.history.go(-1);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        })

    };*/





  /*  $scope.preview=function (data) {
        console.log("previewNews",data);

        $scope.previewContent = data;
        $scope.previewShowList=true;
        $scope.newsList=$scope.previewContent.newsList;

        $("#wxaccountname").html($scope.previewContent.wxAccount.name);

        $("#preview-msg").modal('show');


    }*/


    $scope.$on('$viewContentLoaded', function (event, data) {

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });


});