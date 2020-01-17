angular.module('MetronicApp').controller('wxPublishController', function ($timeout, $filter,$rootScope,$state, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 5};
    $scope.accountpageConf = {currentPage: 1, pageSize: 1000};
    $scope.drafpageConf = {currentPage: 1, pageSize: 5};
    $scope.waitauditpageConf = {currentPage: 1, pageSize: 5};
    $scope.hasauditpageConf = {currentPage: 1, pageSize: 5};
    $scope.QueryCriteria = {};
    $scope.articlePublish=true;
    $scope.daishenhe=false;
    $scope.yishenhe=false;
    $scope.auditsManagement=false;
    $scope.articlePublished=false;
    $scope.haspublisharticle1=false;
    $scope.page4=false;
    $scope.hasauditArticleList='';
    $scope.list='';
    var init1Time = new Date();
    var dateAsString = $filter('date')(init1Time, "yyyy-MM-dd HH:mm");
    console.log(dateAsString);
    $scope.initTime = dateAsString;

    $scope.wxPublish={type:'-1'};

    var  accountz=new Array();
    $scope.getLoginUserInfo = function () {
        $http({
            method: 'GET',
            url: 'userInfo/current'
        }).then(function (response) {
            $rootScope.loginUserInfo = response.data.object;
            console.log("$rootScope.loginUserInfo",$rootScope.loginUserInfo);
        }, function (response) {
            console.log(response);
        });
    };
    $scope.searchWaitAudit=function(){
    $http({
        method:'POST',
        url:"wx/content/getnotpublisharticle",
        data:pageUtil.getQueryData($scope.QueryCriteria,$scope.waitauditpageConf),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}

    }).then(function (response) {
        if(response.data.status==0){
            $scope.auditArticleList =response.data.page.list;
          /*  accountz=$scope.auditArticleList;
            console.log( " $scope.auditArticleList",$scope.auditArticleList);
            console.log(  $scope.pubishArticleList,"  $scope.pubishArticleList");*/
            pageUtil.setResponsePageConf($scope.waitauditpageConf, response.data.page);

            angular.forEach(accountz,function (value,key) {

            })

        }else{
            gpPrompt.error({text: response.data.msg});
        }
        $rootScope.loading = true;
    })
    }

    $scope.publishimage=function(){
        var aa=   $scope.lookAccount();
        $rootScope.publishWx=aa;
        if(!$rootScope.publishWx){

            gpPrompt.error({text:'请选择要发送图片的微信帐号'});
            return;
            // $state.go("wxPublishImg");
        }else
        {
            $state.go("wxPublishImg");
        }
    }
    $scope.publishArticleImg=function(){
        var aa=   $scope.lookAccount();
        $rootScope.publishWx=aa;
        if(!$rootScope.publishWx){

            gpPrompt.error({text:'请选择要发送图文的微信帐号'});
            return;
           //
        }else{
            $state.go("wxPublishArticleImg");
        }

    }

$scope.lookAccount=function(){
    var cc= $("#multiple").val();
    return  cc;
   /*     $timeout(function () {
            var cc= $("#multiple").val();
             $scope.wxPublish.pubAccount=cc;
            $rootScope.publishWx=cc;
    return  cc;
        })*/
    }


    $scope.publishtext=function(){

     var aa=   $scope.lookAccount();
        $rootScope.publishWx=aa;
console.log($rootScope.publishWx);
        if(!$rootScope.publishWx){
            gpPrompt.error({text:'请选择要发送文本的微信帐号'});
           // $state.go("wxPublishSetting");
            return;
            //
        }else{
            $state.go("wxPublishArticle");
        }
    }
    $scope.searchpublishArticle=function(){
        console.log("$scope.pageConf",$scope.pageConf);
        $rootScope.loading = true;
        $http({
            method:'POST',
            url:"wx/content/publisharticle",
            data:pageUtil.getQueryData($scope.QueryCriteria,$scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if(response.data.status==0){
                console.log(  response.data.page,"  response.data.page");
                if(response.data.page.list){
                    $scope.pubishArticleList =response.data.page.list;
                    pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
                }else{

                    $scope.pubishArticleList=="";
                    pageUtil.setResponsePageConf($scope.pageConf, response.data.page={currentPage: 1, pageSize: 5});
                }

                console.log(  response.data.page,"  $scope.pubishArticleList");


                console.log(  response.data.page,"  response.data.page");

            }else{
                gpPrompt.error({text: response.data.msg});
            }
            $rootScope.loading = false;
        })
    }


    $scope.hasaudit=function(){

        $http({
            method: 'POST',
            url:"wx/content/getpublisharticle",
            data:pageUtil.getQueryData($scope.QueryCriteria,$scope.hasauditpageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                console.log("response.data.page",response.data.page);
                $scope.hasauditArticleList = response.data.page.list;

                pageUtil.setResponsePageConf($scope.hasauditpageConf, response.data.page);
                console.log("  $scope.draftlist",  $scope.draftlist);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
            $rootScope.loading = true;


        })


     }

    $scope.path='';
    $scope.wximagelurl='';

    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if(response.data.status==0){
            $scope.path=response.data.object[0];
            $scope.wximagelurl=response.data.object[1];

          console.log("$scope.wximagelurl",$scope.wximagelurl);

        }else{
            gpPrompt.error({text: response.data.msg});
        }


    })


    var accountList=new Array();
    $http({
        method: 'GET',
        url:"wx/account/list"
    }).then(function (response) {
        if (response.data.status === 0) {
            $scope.list = response.data.object;
            //  console.log("  $scope.list",  $scope.list);

            accountList=$scope.list;
            //  console.log("accountList",accountList);
        }    else{

            gpPrompt.error({text: response.data.msg});
        }

    });


    $scope.searchWxAccount = function () {
        $http({
            method: 'POST',
            url: 'wx/account/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.accountpageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.pubaccountlist = response.data.page.list;



            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };






    console.log( $rootScope.loginUserInfo," $rootScope.loginUserInfo");

    $scope.findDraftList=function(){
        $http({
            method: 'POST',
            url:"wx/content/draft",
            data:pageUtil.getQueryData($scope.QueryCriteria,$scope.drafpageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                console.log("response.data.page",response.data.page);
                $scope.draftlist = response.data.page.list;

               pageUtil.setResponsePageConf($scope.drafpageConf, response.data.page);
                console.log("  $scope.draftlist",  $scope.draftlist);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
            $rootScope.loading = true;


        })

    }

    $scope.selectimg=function(data){
        console.log("data",data);
        $("#aa").popover({
            html: true,      //实现对html可写
            /*  title: keywords_title(),   //标题函数
              content: function() {
                  return keywords_content();   //内容函数
              }*/
        });
    }

    $scope.removedraftArticle=function(index){

        $http({
            method: "DELETE",
            url:"wx/content/"+index
        }).then(function (response) {
            if(response.data.status==0){
                gpPrompt.ok({text: response.data.msg});
                $scope.findDraftList();
            }else{
                gpPrompt.error({text: response.data.msg})
            }
        })

    }

    $scope.removewxdraftArticle=function(data){

        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
        $http({
            method:"DELETE",
            url:"wx/content/draft/"+data
        }).then(function (response){

            if(response.data.status==0){
                gpPrompt.ok({text: response.data.msg});
                $scope.findDraftList();
            }else{
                gpPrompt.error({text: response.data.msg});
            }

        })
        })
    };


    $scope.selectPubAccountChange=function(){
        var strtext = $('#multiple').select2('data').text;
        var  arr=new Array();
        arr=  $scope.wxPublish.pubAccount;
       console.log(arr+"axxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxs");
        $rootScope.publishWx=arr;
    }


    $scope.viewArticlePublish=function (){
        $scope.articlePublish=true;
        $scope.auditsManagement=false;
        $scope.haspublisharticle1=false;
        $scope.page=false;
    }

    $scope.management=function(){

        $scope.daishenhe=true;
        $scope.auditsManagement=true;
        $scope.yishenhe=false;
        $scope.articlePublish=false;
        $scope.haspublisharticle1=false;
        $scope.page=false;

    }
    /*待审核*/
    $scope. viewdaishenhe=function(){
        $scope.auditWeibo=true;
        $scope.daishenhe=true;
        $scope.yishenhe=false;
        $scope.newpublishweibo=false;
        $scope.publishList=false;
        $scope.draftshow=false;


    }


    $scope. viewhasshenhe=function(){
        $scope.auditWeibo=true;
        $scope.yishenhe=true;
        $scope.daishenhe=false;

        $scope.newpublishweibo=false;
        $scope.publishList=false;
        $scope.draftshow=false;

    }



    $scope.auditArticle=function(index){

        $http({
            method:'GET',
            url:"wx/content/"+index
        }).then(function (response) {
            if(response.data.status==0){
                $scope.message= response.data.object;
                console.log(" response.data.object",  response.data.object);
                if($scope.message.type==1){
                    $state.go("audittext",{data:$scope.message,cmd:"audit"});
                }else if($scope.message.type==2){
                    $state.go("auditimage",{data:$scope.message,cmd:"audit"});
                }else if($scope.message.type==3){
                    $state.go("auditnew",{data:$scope.message,cmd:"audit"});
                }

            } else {
                gpPrompt.error({text: response.data.msg})
            }

        })



    }

    $scope.haspublishz=function(){
        $scope.haspublisharticle1=true;
        $scope.auditsManagement=false;
        $scope.articlePublish=false;
        $scope.page=false;
    }

    $scope.aWxAccount='';

    $scope.getWxAccount=function(index){

        for(var i=0;i<accountList.length;i++) {

            if( accountList[i].id==index){
                return  accountList[i].name;

            }}

    }

    $scope.tanchu=function(data){

    }

    $scope.chehui=function(index){

        $http({
            method:'PUT',
            url:'wx/content/'+index
        }).then(function (response) {
            if(response.data.status==0){
                gpPrompt.ok({text: response.data.msg});
                $scope.hasaudit();
                $scope.searchpublishArticle();
            }else{
                gpPrompt.error({text: response.data.msg})
            }
        })

    };





    $scope.getWxAccountlog=function(index){

        for(var i=0;i<accountList.length;i++) {

            if( accountList[i].id==index){
                return  accountList[i].logo;

            }}

    }




    $scope.$watch('pageConf.currentPage+pageConf.pageSize',function(newValue, oldValue){

        $scope.searchpublishArticle();


    });
    $scope.$watch('waitauditpageConf.currentPage+waitauditpageConf.pageSize',function(newValue, oldValue){

        $scope.searchWaitAudit();


    });
    $scope.$watch('hasauditpageConf.currentPage+hasauditpageConf.pageSize',function(newValue, oldValue){

        $scope.hasaudit();


    });

    $scope.$watch('drafpageConf.currentPage+drafpageConf.pageSize',function(newValue, oldValue){

        $scope.findDraftList();


    });


    $scope.page4=function(){
        $scope.page=true;
        $scope.auditsManagement=false;
        $scope.articlePublish=false;
        $scope.haspublisharticle1=false;
    }


    $scope.removePublishArticle=function(data){

        var  id=data.id;
       var aa= data.type;
      if(aa==1){
          gpPrompt.confirm('群发文字只能删除本地记录，确认删除？', function () {
              $rootScope.loading = true;
              $http({
                  method:'DELETE',
                  url:'wx/content/'+id
              }).then(function (response) {
                  if(response.data.status==0){
                      gpPrompt.ok({text: response.data.msg});
                      $scope.searchpublishArticle();
                  }else{
                      gpPrompt.error({text: response.data.msg})
                  }
              })
          })
      }else{
          gpPrompt.confirm('删除后不可恢复，确认删除？', function () {
              $rootScope.loading = true;
              $http({
                  method:'DELETE',
                  url:'wx/content/'+id
              }).then(function (response) {
                  if(response.data.status==0){
                      gpPrompt.ok({text: response.data.msg});
                      $scope.searchpublishArticle();
                  }else{
                      gpPrompt.error({text: response.data.msg})
                  }
              })
          })

      }



    }

    $scope.changetext=function(){

    }

    $scope.selectChange=function () {


        if($scope.wxPublish.type==1){
            $state.go('wxPublishArticle');
        }
        if($scope.wxPublish.type==2){
            $state.go('wxPublishImg');;
        }
        if($scope.wxPublish.type==3){
            $state.go('wxPublishArticleImg');
        }
        if($scope.wxPublish.type==4){

        }
    }

    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.searchpublishArticle();
        $scope.searchWxAccount();
        $scope.findDraftList();
        $scope.searchWaitAudit();
        $scope.hasaudit();
        $scope.getLoginUser();
        $scope.getLoginUserInfo();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

    $scope.getLoginUser = function () {
        $http({
            method: 'GET',
            url: 'user/current'
        }).then(function (response) {
            $rootScope.loginUser = response.data.object;
        }, function (response) {
            console.log(response);
        });
    };
/*立即发布*/

    $scope.submitFormnow=function(data){
        $scope.pumessage=data;
        $scope.pumessage.publishDate=dateAsString;
        $http({
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
        });

    }

    $scope.submitTimerForm=function(data){

        $scope.pumessage=data;
        $("#fabuModal").modal("show");



    }

    $scope.submitPublish=function(data){

if(!$scope.pumessage.publishDate){
    gpPrompt.error({text: "请选择发布时间"})
    return;
}
$http({
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
});
}






    $scope.editdraftArticle=function (event) {

        $http({
           method:'GET',
          url:"wx/content/"+event

       }).then(function (response) {
            if(response.data.status==0){
                $scope.message= response.data.object;
               console.log(" response.data.object",  response.data.object);
                 if($scope.message.type==1){
                    $state.go("wxPublishArticle",{data:$scope.message,cmd:"edit"});
                }else if($scope.message.type==2){
                  $state.go("wxPublishImg",{data:$scope.message,cmd:"edit"});
               }else if($scope.message.type==3){
                   $state.go("wxPublishArticleImg",{data:$scope.message,cmd:"edit"});
               }



           } else {
               gpPrompt.error({text: response.data.msg})
           }

        })

    }


})