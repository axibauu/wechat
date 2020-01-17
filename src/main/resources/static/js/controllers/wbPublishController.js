angular.module('MetronicApp').controller('wbPublishController', function ($stateParams,Upload,$timeout,$rootScope,$state, $scope, settings,$filter, $http, gpPrompt,drafpageUtil, pageUtil,$location) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.drafpageConf = {currentPage: 1, pageSize: 10};
    $scope.waitauditpageConf = {currentPage: 1, pageSize: 10};
    $scope.hasauditpageConf = {currentPage: 1, pageSize: 10};
    $scope.audit={tempstatus :''};
    $scope.QueryCriteria = {};
   var date = new Date();
    var dateAsString = $filter('date')(date, "yyyy-MM-dd HH:mm");
    $scope.wbPublish={accounts:'-1',length:0,type:'-1',publishDate:dateAsString};
    $scope.deletewb={};
    $scope.cmd="new";
    var dateAsString = $filter('date')(date, "yyyy-MM-dd HH:mm");
    $scope.initTime=dateAsString;
    $scope.ajaxwb={};
    $scope.newpublishweibo=false;
    $scope.publishList=false;
    $scope.auditWeibo=false;
    $scope.daishenhe=false;
    $scope.draftshow=true;
    $scope.draftList=function () {
        $scope.auditWeibo=false;
        $scope.newpublishweibo=false;
        $scope.publishList=false;
        $scope.draftshow=true;



    }
    $scope.user={role:''};
    $scope.newweibo=function () {
        $scope.newpublishweibo=true;
        $scope.publishList=false;
        $scope.draftshow=false;
        $scope.auditWeibo=false;
    }

    $scope.hasPublishList=function () {
        $scope.publishList=true;
        $scope.newpublishweibo=false;
        $scope.auditWeibo=false;
        $scope.draftshow=false;
    }
    $scope.auditList=function () {
        $scope.auditWeibo=true;
        $scope.newpublishweibo=false;
        $scope.publishList=false;
        $scope.draftshow=false;
        $scope.viewdaishenhe();

    }
    $scope.viewdaishenhe=function(){
        $scope.auditWeibo=true;
        $scope.daishenhe=true;
        $scope.yishenhe=false;
    }


    $scope.viewhasshenhe=function(){
        $scope.auditWeibo=true;
        $scope.daishenhe=false;
        $scope.yishenhe=true;

    }
    $scope.getUserRole=function(){
        $http({
            method:'GET',
            url:"user/current"
        }).then(function (response) {
            if(response.data.status==0){
                $scope.user= response.data.object;
                console.log($scope.user);
            }else{
                gpPrompt.error({text:response.data.msg});
            }
        })

    }

console.log($stateParams.data);
    if( $stateParams.data=="send"){

        if($scope.user.role){
            $scope.hasPublishList();
        }else{
            $scope.draftList();
        }

    }else if( $stateParams.data=="save"){
        if($scope.user.role){
            $scope.hasPublishList();
        }else{
            $scope.draftList();
        }

    }






    $http({
        method:'GET',
        url:'wb/content/geturl'
    }).then(function (response) {
        if(response.data.status==0){
         $scope.wburl= response.data.object[0];
         console.log(" $scope.wburl", $scope.wburl);
            $scope.wbpath= response.data.object[1];
        }else{
            gpPrompt.error({text: response.data.msg});
        }
    })


   $scope.getwbPublishaccount=function(){
    $http({
        method: 'POST',
        url: 'wb/account/page',
        data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        if (response.data.status === 0) {
            $scope.WbAccountList = response.data.page.list;
            $scope.wbPublish.accountList=  $scope.WbAccountList;
            console.log(" $scope.wbPublishaccount",  $scope.wbPublish.account);
            console.log(" $scope.WbAccountList", $scope.WbAccountList)
            pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
        } else {
            gpPrompt.error({text: response.data.msg});
        }
    }, function (response) {
    });
   }
    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.getwbPublishaccount);

    $scope.wbSelectChange=function(){

        var arr = new Array();
        arr=  $scope.wbPublish.accounts;
        console.log(" $scope.wbPublish", $scope.wbPublish);

        $scope.wbPublish.length=  arr.length;
    }

    $scope.textLength=140;
    $scope.wbPublish.content='';
    $scope.changeText=function () {
        var length= $scope.wbPublish.content.length;
   /*   var length=   $("#content_1").val.length;*/
        $scope.textLength=140-length;
        console.log(length);
        console.log("  $scope.textLength",  $scope.textLength);
        if( length>139){
            $scope.textLength==0;
            $("#content_1").val( $scope.wbPublish.content.slice(0,140));

        }

    };
    $scope.selectfile=function(){
        $("#file").trigger("click");
    }
    $scope.lookAccount=function(){
        var cc= $("#multiple").val();
        return  cc;

    }




    /*草稿*/
    $scope.saveForm = function () {
        var aa=   $scope.lookAccount();

        $scope.wbPublish.accounts=aa;
        console.log($scope.wbPublish.accounts,"$scope.wbPublish.accounts");
        if(!$scope.wbPublish.accounts||$scope.wbPublish.accounts=='-1'){
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

    /*点击话题*/
    $scope.clickTopic=function () {

        $scope.wbPublish.content='#请输入话题#';
        
    }




    $scope.deleteimage2=function(){
        $scope.tempwbpublish= $scope.wbPublish;
        $scope.tempwbpublish.image='';
        $scope.wbPublish=$scope.tempwbpublish;

        console.log(   $scope.wbPublish,"$scope.wbPublish.image");

    }
    $scope.deleteimage=function(event){
        console.log(event,"event");
        $scope.wbPublish={accounts: $scope.at,content:$scope.ct,image:''};
        $scope.ajaxwb.img=null;
        console.log(   $scope.wbPublish.image,"$scope.wbPublish.image");
       // $scope.$broadcast("viewContentLoaded", null);
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
/*
                 var file = document.getElementById('file');
                 //虽然file的value不能设为有字符的值，但是可以设置为空值
                 //或者
                 file.outerHTML = file.outerHTML;*/


                 $scope.deleteimage2();
                /* $scope.wbPublish={accounts: $scope.at,content:$scope.ct,image:''};*/
                 console.log($scope.wbPublish.image," $scope.wbPublish.image");
                 return ;
             }
         }





        }

    });

    $scope.clearSelect = function () {
        $timeout(function () {
            $scope.wbPublish.accounts = [];
           $("#multiple").select2("val", " ");

        })
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

    /*定时发送*/
    $scope.submitTimerForm = function () {
        var aa=   $scope.lookAccount();

        $scope.wbPublish.accounts=aa;
        if(!$scope.wbPublish.accounts||$scope.wbPublish.accounts=='-1'){
            gpPrompt.error({text: "请选择发送帐号"});
            return;
        }
        if (!$scope.wbPublish.content) {
            gpPrompt.error({text: "请输入发送内容"});
            return;
        }

        $scope.pumessage=$scope.wbPublish;
        $("#fabuModal").modal("show");

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

    }



    /*立即发送*/
    $scope.submitForm = function () {
        var aa=   $scope.lookAccount();

        $scope.wbPublish.accounts=aa;
        if(!$scope.wbPublish.accounts||$scope.wbPublish.accounts=='-1'){
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
            publishDate: '',
            content: $scope.wbPublish.content
        });
    };

$scope.aacbb=function(){

    var site=$('#multiple').find("option:selected").text();
    $("#multiple option[value='" + site + "']").attr("selected", "false");
    resetAll();
}

    $scope.doSubmitForm = function(data){
        $scope.$broadcast("submitForm", data);
    };


    $scope.$on("submitForm", function (event, data) {
        console.log("data",data);

        if('uploadwbimg'==data.cmd){

            $rootScope.loading = true;

            var  aa=new  Array();

            aa=  $scope.wbPublish.accounts;
            var join = aa.join(",");
            console.log("join",join);
            Upload.upload({
                method: 'POST',
                url: 'wb/content/uploadMedia',
                data: {accountID: join,type:'img'},
                file: data.file,
            }).then(function (response) {
                if (response.data.status === 0) {
                    $scope.ajaxwb.img=response.data.object;

                } else {
                    console.log("1111");
                    $scope.wbPublish.image=={};
                    $scope.ajaxwb.img={};
                    gpPrompt.error({text: response.data.msg});
                }
            });
        }else if("submit_new"==data.cmd){

            var  aa=new  Array();

            aa=  $scope.wbPublish.accounts;
            var join = aa.join(",");
            if(!join){

                return;
            }
            $rootScope.loading = true;
            $http({
                url:"wb/content/"+join,
                method:"POST",
                data:{cmd:data.realCmd,publishDate:data.publishDate,img: $scope.ajaxwb.img,content:data.content},
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


                    $timeout(function () {
                        $scope.wbPublish.accounts = [];
                       // $("#multiple").select2("val", null);
                        $("#multiple").val(null).trigger("change");
                        $scope.searchPublishWeibo();
                        $scope.finddaishenhe();
                        $scope.searchPublishWeibo();
                        $scope.searchauditWeibo();
                        $scope.searchdraflist();
                        $scope.wbPublish={};
                        gpPrompt.ok({text: response.data.msg});
                    })

                    if(!$scope.user.role){
                        if(data.realCmd=="send"){
                            $scope.auditList();
                        }else{
                            $scope.draftList();
                        }

                    }else{
                        if(data.realCmd=="send"){
                            $scope.auditList();
                        }else{
                            $scope.draftList();
                        }
                }


                }else{
                    $timeout(function () {
                        $scope.wbPublish.accounts = [];
                        $("#multiple").val(null).trigger("change");
                        gpPrompt.error({text:response.data.msg})
                    })

                }


            });
        }else if("submit_edit"==data.cmd){
            $rootScope.loading = true;
            var mpnews = angular.toJson($scope.doJsonList($scope.newsList));
            $http({
                url:"wx/content/update",
                method:"POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data:{cmd:data.realCmd,type:3,publishDate:data.publishDate,mpnews:mpnews,id:$scope.id}
            }).then(function(response){
                $rootScope.loading = false;
                if(response.data.status==0){
                    $scope.clearSelect();
                    $scope.finddaishenhe();
                    $scope.searchPublishWeibo();
                    $scope.searchauditWeibo();
                    $scope.searchdraflist();
                    if(!$scope.user.role){
                        if(data.realCmd=="send"){
                            $scope.auditList();
                        }else{
                            $scope.draftList();
                        }

                    }else{
                        if(data.realCmd=="send"){
                            $scope.auditList();
                        }else{
                            $scope.draftList();
                        }
                    }
                    //window.history.go(-1);

                }else{
                    $scope.clearSelect();
                    gpPrompt.error({text:response.data.msg});
                    //$scope.wbPublish.accounts=null;
                }
            });
        }

      //  console.log(data.realCmd);
      /*  if(data.realCmd=="save"){
            console.log("save");

            $scope.draftList();
        }else if(data.realCmd=="send"){
            $scope.publishList();
        }*/


    });

    function resetAll() {

        $("#aa").click(function(){
            $(".form-control").each(function(i){    //input内容重置
                $(this).attr('value',"");
                $("#multiple").each(function (i, j) {        //select内容重置
                    $(j).find("option:selected").attr("selected", false);
                    $(j).find("option").first().attr("selected", true);
                });
            });
        });



          $("#myform").find('input[type=text],select,input[type=hidden]').each(function() {
                   $(this).val('');
               });
       }
$scope.searchauditWeibo=function(){
    $http({
        method:'POST',
        url:'wb/content/auditlist',

        data:pageUtil.getQueryData($scope.QueryCriteria,$scope.hasauditpageConf),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        if(response.data.status==0){
            $scope.auditLish= response.data.page.list;
            console.log(" $scope.auditLish", $scope.auditLish);
            pageUtil.setResponsePageConf($scope.hasauditpageConf, response.data.page);
        }else{
            gpPrompt.error({text: response.data.msg});

        }

    })

}

$scope.searchdraflist=function(){

    $http({
        method:'POST',
        url:'wb/content/draft',
        data:pageUtil.getQueryData($scope.QueryCriteria,$scope.drafpageConf),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    }).then(function (response) {
        if(response.data.status==0){
            $scope.draftwblist= response.data.page.list;
            console.log(" $scope.draftwblist", $scope.draftwblist);
           pageUtil.setResponsePageConf($scope.drafpageConf, response.data.page);
        }else{
            gpPrompt.error({text: response.data.msg});

        }

    })
}

$scope.removeDraft=function(index){
    $http({
        method:'DELETE',
        url:'wb/content/'+index
    }).then(function (response) {
        if(response.data.status==0){
            gpPrompt.ok({text: response.data.msg});
            $scope.searchdraflist();
         }else {
            gpPrompt.error({text: response.data.msg});
        }
    })
}


$scope.selectpwd=function(data){

    $scope.publishwb=data;
    console.log(" $scope.publishwb", $scope.publishwb);
    $scope.editimageurl="storage/wbimage/"+$scope.publishwb.wbAccount.id+"/"+$scope.publishwb.imgurl;
  /*  $scope.publishwb.thume=$scope.wburl+"/"+$scope.publishwb.wbAccount.id+"/"+$scope.publishwb.imgurl;
    $scope.publishwb.thumepa=$scope.wbpath+"/"+$scope.publishwb.wbAccount.id+"/"+$scope.publishwb.imgurl;*/
  console.log(" $scope.publishwb", $scope.publishwb);
    $("#wbpublshiform").modal("show");

};

    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if (response.data.status == 0) {
            $scope.path = response.data.object[0];
            $scope.wxurl = response.data.object[1];
            //   console.log("$scope.path",$scope.path);

            //   console.log(" $scope.wxpublishurl", $scope.wxpublishurl);
            // console.log("$scope.wxurl",$scope.wxurl);

        } else {
            gpPrompt.error({text: response.data.msg});
        }
    })


    $scope.deletepwd=function(even){
        gpPrompt.error({text: '删除功能暂未开放'});
        return;

            $scope.deletewb=even;
            console.log(  $scope.deletewb,"  $scope.deletewb");
               $scope.id= $scope.deletewb.id;
                $http({
                    method:'DELETE',
                    url:'wb/content/HasPublishlist/'+$scope.id,
                }).then(function (response) {
                    if(response.data.status==0){

                        $scope.searchPublishWeibo();
                    }else{
                        gpPrompt.error({text: response.data.msg});

                    }
                })

    }


    $scope.Reject=function(data){
        $scope.audit.tempstatus="0";
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
           $scope.searchdraflist();

                gpPrompt.ok({text: response.data.msg});
                $scope.yishenhe=true;
                $scope.daishenhe=false;

                $scope.newpublishweibo=false;
                $scope.publishList=false;
                $scope.draftshow=false;
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        })

    };


    $scope.chehui=function(index) {
        $http({
            method: 'PUT',
            url: 'wb/content/' + index
        }).then(function (response) {
            if (response.data.status == 0) {
                gpPrompt.ok({text: response.data.msg});
                $scope.searchauditWeibo();
              $scope.searchdraflist();
            } else {
                gpPrompt.error({text: response.data.msg})
            }
        })

    }
$scope.submitauditFormnow=function(data){
    $scope.pumessage=data;
    $scope.pumessage.publishDate=dateAsString;
    $http({
        method:"POST",
        url:"wb/content/pub",
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
            $scope.searchauditWeibo();
            gpPrompt.ok({text: response.data.msg});
        }else{
            gpPrompt.error({text:response.data.msg})
        }
    });

    }

    $scope.submitauditTimerForm=function(data){
        $scope.pumessage=data;
        $("#auditfabuModal").modal("show");
    }

    $scope.submitauditPublish=function(data){

        if(!$scope.pumessage.publishDate){
            gpPrompt.error({text: "请选择发布时间"})
            return;
        }
        $http({
            method:"POST",
            url:"wb/content/pub",
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
                $("#auditfabuModal").modal("hide");
                $scope.searchauditWeibo();
                $scope.searchdraflist();
                gpPrompt.ok({text: response.data.msg});
            }else{
                gpPrompt.error({text:response.data.msg})
            }
        });

    }

    /*通过*/
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


                $scope.searchauditWeibo();
                $scope.searchdraflist();
                $scope.viewhasshenhe();

            } else {
                gpPrompt.error({text: response.data.msg});
            }
        })

    };

    $scope.auditpublishwb=function(data){

        $scope.auditwb=data;
        console.log($scope.auditwb);

      /*  $scope.publishwb.thume=$scope.wburl+"/"+$scope.publishwb.wbAccount.id+"/"+$scope.publishwb.imgurl;
        $scope.publishwb.thumepa=$scope.wbpath+"/"+$scope.publishwb.wbAccount.id+"/"+$scope.publishwb.imgurl;*/
        console.log(" $scope.auditwb", $scope.auditwb);
        $state.go("wbaudit",{data:$scope.auditwb,cmd:"audit"});
      //  $("#wbauditform").modal("show");


    }
    $scope.editDraft=function(data){
console.log(data);
        $state.go("wbeditorsetting",{data:data});

    }

    $scope.sendWeibo = function(data){

        window.open("http://service.weibo.com/share/share.php?appkey=451706750&title="+data.content+"&pic="+$scope.publishwb.thumepa,+"_blank");
    };
        $scope.finddaishenhe=function(){

            $http({
                method:'POST',
                url:'wb/content/waitauditlist',
                data:pageUtil.getQueryData($scope.QueryCriteria,$scope.waitauditpageConf),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (response) {
                if(response.data.status==0){
                    $scope.waitAuditWb= response.data.page.list;
                  /*  if($scope.waitAuditWb!=null){
                   var arr=new Array();
                    arr=$scope.waitAuditWb;
                    for(var i=0;i<arr.length;i++){
                        arr[i].wbAccount.clientID;


                    } }*/
                    console.log("  $scope.waitAuditWb",  $scope.waitAuditWb);
                   pageUtil.setResponsePageConf($scope.waitauditpageConf, response.data.page);
                }else{
                 //   gpPrompt.error({text: response.data.msg});

                }
            })
            console.log("  $scope.waitAuditWb",  $scope.waitAuditWb);

        };



    $scope.searchPublishWeibo=function(){
        $http({
            method:'POST',
            url:'wb/content/HasPublishlist',

            data:pageUtil.getQueryData($scope.QueryCriteria,$scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if(response.data.status==0){
             $scope.pwbLish= response.data.page.list;
             console.log(response.data,"response.data");
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            }else{
                gpPrompt.error({text: response.data.msg});

            }
        })

    }


    $scope.$watch('pageConf.currentPage+pageConf.pageSize',function(newValue, oldValue){

        $scope.searchPublishWeibo();


    });
    $scope.$watch('waitauditpageConf.currentPage+waitauditpageConf.pageSize',function(newValue, oldValue){

        $scope.finddaishenhe();


    });
    $scope.$watch('hasauditpageConf.currentPage+hasauditpageConf.pageSize',function(newValue, oldValue){

        $scope.searchauditWeibo();


    });
    $scope.$watch('drafpageConf.currentPage+drafpageConf.pageSize',function(newValue, oldValue){

        $scope.searchdraflist();


    });




    $scope.emotionclick=function () {

       /* $('＃emotion').popover();*/

        $ ("[data-toggle ='popover']" ).popover();
    }


    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.getUserRole();
        $scope.finddaishenhe();
        $scope.searchPublishWeibo();
        $scope.searchauditWeibo();
        $scope.searchdraflist();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

})