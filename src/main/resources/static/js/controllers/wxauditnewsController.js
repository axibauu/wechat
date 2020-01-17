angular.module('MetronicApp').controller('wxauditnewsController', function ( $stateParams,$rootScope,$state,$filter, $scope, settings, $http, gpPrompt, pageUtil) {

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
        $rootScope.publishWx=$scope.editmessage.wxAccountID;
        console.log("  $rootScope.publishWx",   $rootScope.publishWx);
        $scope.id=$scope.editmessage.id;

        var time=$scope.editmessage.createDate;
        $scope.audit.createDate=$filter('date')(time, "yyyy-MM-dd");

        $scope.audit.newsList=$scope.editmessage.newsList;

        var   arr=new Array();
        arr= $scope.audit.newsList;
        console.log("arr",arr);
        for(var i=0;i<arr.length;i++){
            var  scon=   arr[i].content;
            var s1 = scon.toString().replace("<p>","");
            var s2 = s1.toString().replace("</p>","");



            arr[i].content=s2;


        }

        $scope.audit.newsList=arr;
        $scope.news=$scope.editmessage.newsList[0];

        $scope.editmessage.wxAccount.name;


    }
    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if(response.data.status==0){
            $scope.path=response.data.object[0];
            $scope.wxurl=response.data.object[1];
            console.log("$scope.path",$scope.path);
            //  $scope.wxpublishurl=$scope.wxurl+'/'+starray[0];
            // console.log(" $scope.wxpublishurl", $scope.wxpublishurl);
            console.log("$scope.wxurl",$scope.wxurl);

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


    $scope.Reject=function(){

        $scope.formName = "退回图文";
        $("#weixinPublishNumber").modal("show");

    }


    $scope.submitWxtextContentForm=function() {
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

    };





    $scope.preview=function (data) {
        console.log("previewNews",data);

        $scope.previewContent = data;
        $scope.previewShowList=true;
        $scope.newsList=$scope.previewContent.newsList;

        $("#wxaccountname").html($scope.previewContent.wxAccount.name);

        $("#preview-msg").modal('show');


    }

    $scope.showDetail = function(news){
        $scope.previewShowList=false;
        $("#tab_info_content").html(news.content);
    };
    $scope.$on('$viewContentLoaded', function (event, data) {

        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });


});