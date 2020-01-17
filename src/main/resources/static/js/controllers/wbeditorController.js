angular.module('MetronicApp').controller('wbeditorController', function (Upload,$rootScope,$timeout,$state, $scope,  $stateParams,settings,$filter, $http, gpPrompt,drafpageUtil, pageUtil,$location) {
    $scope.wbpageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.wbPublish={image:""};
    $scope.editwbPublish={imgurl:''};
    $scope.editwbPublish= $stateParams.data;
    $scope.ajaxwb={ img:''};
$scope.firstload=true;

    $scope.cmd="edit";
    if($stateParams.data==null){
        $state.go("wbPublishSetting");
    }else{
        $scope.wbPublish.accounts= $scope.editwbPublish.wbAccount.name;
        $scope.wbPublish.wxid= $scope.editwbPublish.wbAccount.id;

        $scope.wbPublish.content=$scope.editwbPublish.content;
    }

    console.log(  $scope.editwbPublish," $scope.editwbPublish");
console.log( $scope.wbPublish.image," $scope.wbPublish.image");
    if($scope.editwbPublish.imgurl!=null&&$scope.editwbPublish.imgurl!=''){
        $scope.wbPublish.image=$scope.editwbPublish.imgurl;
    }


    $scope.selectfile=function(){
        $("#file").trigger("click");
    }

    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if(response.data.status==0){
            $scope.path=response.data.object[0];
            $scope.wxurl=response.data.object[1];
            //   console.log("$scope.path",$scope.path);
            /*   $scope.wxpublishurl=$scope.wxurl+'/'+$rootScope.publishWx[0];*/
            //   console.log(" $scope.wxpublishurl", $scope.wxpublishurl);
            console.log("$scope.wxurl",$scope.wxurl);

        }else{
            gpPrompt.error({text: response.data.msg});
        }


    })


    $scope.deleteimage=function(){
         $scope.tempwbpublish= $scope.wbPublish;
        $scope.tempwbpublish.image='';
        $scope.wbPublish=$scope.tempwbpublish;

        console.log(   $scope.wbPublish,"$scope.wbPublish.image");

    }

    $scope.lookimage=function(img){


       $scope.editimageurl="storage/wbimage/"+  $scope.wbPublish.wxid+"/"+img;
       console.log( $scope.editimageurl);
        /*   $scope.wxurl+"/"+"wb/"+$scope.editwbPublish.wbAccount.id+"/"+img;
*/
$("#wbPublishNumber").modal("show");



    }

    $scope.$watch('wbPublish.image',function(newValue, oldValue){
        $scope.at=  $scope.wbPublish.accounts;
        $scope.ct=  $scope.wbPublish.content;
        console.log("$scope.wbPublish",$scope.wbPublish);
        var arrayObj = new Array(["jpeg","png", "gif"]);
        var jpeg ="jpeg";
        var png ="png";
        var gif = "gif";

        if(newValue && newValue!=oldValue && $scope.wbPublish.image!=null){
            var  namestr=newValue.name;

            if(namestr.length>0){
                var namelast=  namestr.substring(namestr.lastIndexOf(".")+1,namestr.length);

                if(namelast==jpeg||namelast==png||namelast==gif) {

                    console.log("selectedNews.thumbImage", $scope.wbPublish.image);
                    $scope.doSubmitForm({cmd: 'uploadwbimg', file: $scope.wbPublish.image});

                }else{
                    console.log("1111");
                    gpPrompt.error({text: '仅允许png,jpeg,gif格式'});

                    var file = document.getElementById('file');
                    //虽然file的value不能设为有字符的值，但是可以设置为空值
                    //或者
                    file.outerHTML = file.outerHTML;
                    var  cc=$("#file").val();
                    $scope.tempwbpublish= $scope.wbPublish;
                    $scope.tempwbpublish.image='';
                    $scope.wbPublish=$scope.tempwbpublish;



                    console.log($scope.wbPublish.image," $scope.wbPublish.image");
                    return ;
                }
            }





        }

    });


    $scope.searchWbAccount = function () {
        $http({
            method: 'POST',
            url: 'wb/account/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.wbpageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.WbAccountList = response.data.page.list;

                console.log(" $scope.WbAccountList", $scope.WbAccountList)
                pageUtil.setResponsePageConf($scope.wbpageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };

    /*审核*/

    $scope. submitAudit=function(){

        if(!$scope.wbPublish.accounts){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }
console.log($scope.wbPublish.content);
console.log($scope.wbPublish.image);

        if (!$scope.wbPublish.content&&!$scope.wbPublish.image) {
            gpPrompt.error({text: "微博内容不能为空"});
            return;
        }
        if ($scope.wbPublish.publishDate < $scope.initTime) {
            gpPrompt.error({text: "日期不能小于当前时间"});
            return;
        }


        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.wbPublish.publishDate,
            content: $scope.wbPublish.content
        });
    }

    /*定时*/
    $scope.submitTimerForm = function () {

        if(!$scope.wbPublish.accounts){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }
        if (!$scope.wbPublish.content) {
            gpPrompt.error({text: "请输入发送内容"});
            return;
        }
        $scope.pumessage=$scope.wbPublish;
        $("#fabuModal").modal("show");
      /*  $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.wbPublish.publishDate,
            content: $scope.wbPublish.content
        });*/
    };
    $scope.submitPublish=function(data){

        if(!$scope.pumessage.publishDate){
            gpPrompt.error({text: "请选择发布时间"})
            return;
        }
        $("#fabuModal").modal("hide");
        $scope.wbPublish.publishDate = $scope.pumessage.publishDate;

        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.wbPublish.publishDate,
            content: $scope.wbPublish.content
        });
        /*     $http({
                 method:"POST",
                 url:"wx/content/pub",
                 data: {id:$scope.pumessage.id,time:$scope.pumessage.publishDate},
                 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                 transformRequest: function(obj) {
                     var str = [];
                     for(var p in obj){
                         str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                     }
                     return str.join("&");
                 }
             }).then(function(response){
                 $rootScope.loading = false;
                 if(response.data.status==0){
                     $("#fabuModal").modal("hide");
                     $scope.hasaudit();
                     gpPrompt.ok({text: response.data.msg});
                 }else{
                     gpPrompt.error({text:response.data.msg})
                 }
             });*/
    }

    /*草稿*/
    $scope.saveForm = function () {
        if(!$scope.wbPublish.accounts){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }

        console.log("$scope.wbPublish.content", $scope.wbPublish.content);
        if (!$scope.wbPublish.content) {
            gpPrompt.error({text: "微博文本不能为空"});
            return;
        }
        if ($scope.wbPublish.publishDate < $scope.initTime) {
            gpPrompt.error({text: "日期不能小于当前时间"});
            return;
        }
        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'save',
            publishDate: $scope.wbPublish.publishDate,
            content: $scope.wbPublish.content
        });


    };

    /*审核*/

    $scope. submitAudit=function(){

        var aa=   $scope.lookAccount();

        $scope.wbPublish.accounts=aa;
        if(!$scope.wbPublish.accounts){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }
        console.log($scope.wbPublish.content);
        console.log($scope.wbPublish.image);
        if (!$scope.wbPublish.content&&!$scope.wbPublish.image) {
            gpPrompt.error({text: "微博内容不能为空"});
            return;
        }
        if ($scope.wbPublish.publishDate < $scope.initTime) {
            gpPrompt.error({text: "日期不能小于当前时间"});
            return;
        }


        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: $scope.wbPublish.publishDate,
            content: $scope.wbPublish.content
        });
    }

    /*立即发送*/

    $scope.submitForm=function(){
        if(!$scope.wbPublish.accounts){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }
        if (!$scope.wbPublish.content) {
            gpPrompt.error({text: "请输入发送内容"});
            return;
        }
        console.log( $scope.wbPublish," $scope.wbPublish");
        $scope.doSubmitForm({
            cmd: "submit_" + $scope.cmd,
            realCmd: 'send',
            publishDate: null,
            content: $scope.wbPublish.content
        });
    }

    $scope.doSubmitForm = function(data){
        $scope.$broadcast("submitForm", data);
    };


    $scope.$on("submitForm", function (event, data) {
        console.log("data",data);

        if('uploadwbimg'==data.cmd){
            $scope.firstload=false;
            $rootScope.loading = true;
            Upload.upload({
                method: 'POST',
                url: 'wb/content/uploadMedia',
                data: {accountID:  $scope.wbPublish.wxid,type:'img'},
                file: data.file,
            }).then(function (response) {
                if (response.data.status === 0) {
                    $scope.ajaxwb.img=response.data.object;
                    $scope.wbPublish.image= $scope.ajaxwb.img;

                    console.log("$scope.ajaxwb.img",$scope.ajaxwb.img);
                } else {
                    $scope.wbPublish.image==null;
                    $scope.ajaxwb.img={};
                    gpPrompt.error({text: response.data.msg});
                }
            });
        }else if("submit_edit"==data.cmd){


            $rootScope.loading = true;
console.log($scope.wbPublish,"$scope.wbPublish.id");
            $http({
                url:"wb/content/update/"+ $scope.wbPublish.wxid,
                method:"POST",
                data:{id:$scope.editwbPublish.id,cmd:data.realCmd,publishDate:data.publishDate,img: $scope.ajaxwb.img,content:$scope.wbPublish.content},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(function(response){
                $rootScope.loading = false;
                if(response.data.status==0){
                    gpPrompt.ok({text: response.data.msg});
                    $scope.wbPublish={};
                    $scope.wbPublish.accounts=null;

                    $scope.clearSelect();
                    console.log(111111111111111);
                    console.log(data.realCmd,"$scope.wbPublish.id");
                    $state.go("wbPublishSetting",{data:data.realCmd});
                }else{

                    gpPrompt.error({text:response.data.msg})
                }
            });


        }




    });

    $scope.clearSelect = function () {
        $timeout(function () {
            $scope.wbPublish.accounts = []
            $("#multiple").select2("val", " ");
          //  $("#sf").trigger("click");
        })
    };

    $scope.$on('$viewContentLoaded', function (event, data) {

        $scope.searchWbAccount();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });





})