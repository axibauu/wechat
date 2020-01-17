angular.module('MetronicApp').controller('wxauditimagesController', function ( $stateParams,$rootScope,$state,$filter, $scope, settings, $http, gpPrompt, pageUtil) {

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
        $scope.audit.createDate =$scope.editmessage.createDate;
        console.log("  $rootScope.publishWx",   $rootScope.publishWx);
        console.log("    $scope.editmessag",     $scope.editmessage);
        $scope.id=$scope.editmessage.id;
        /*     $scope.message.content= $scope.editmessage.text.content;
             $scope.message.title=$scope.editmessage.text.title;
             $scope.message.publishDate=$scope.editmessage.publishDate;
     */
    }

    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if(response.data.status==0){
            $scope.path=response.data.object[0];
            $scope.wxurl=response.data.object[1];


        }else{
            gpPrompt.error({text: response.data.msg});
        }


    })


    /*审核通过*/
    $scope.auditpass=function(){
        $scope.audit.tempstatus=4;

        $http({
            method:"POST",
            url:"wx/content/"+  $rootScope.publishWx+"/audit",
            data:{status:$scope.audit.tempstatus,id:$scope.id},
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

    $scope.submitWxtextContentForm=function() {
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
        $('.modal-backdrop').remove();
        $("#weixinPublishNumber").modal("hide");
    };


    $scope.preview=function (data) {
        $scope.previewimage=data;
        /*   $scope.account=*/
        console.log($scope.previewimage,"$scope.previewimage");



        $scope.previewShowList=false;

        var imageUrl = $scope.wxurl+"/wx/"+$scope.publishWx+"/"+  $scope.previewimage.image.imgUrl;
        $("#tab_info_content").html('<img src="'+imageUrl+'" style="width: 90%;" />');

        $("#wxaccountname").html($scope.previewimage.wxAccount.name);

        $("#preview-msg").modal('show');

    }

    $scope.$on('$viewContentLoaded', function (event, data) {

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });



});