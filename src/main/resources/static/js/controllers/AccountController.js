/* Setup general page controller */
angular.module('MetronicApp').controller('AccountController', function (Upload,$rootScope,$state, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.wbpageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.viewAccount=false;
    $scope.logoweibo={};
    $scope.view=true;
    $scope.WxAccountName={flag: true};
    $scope.WbAccountName={flag:false};
    $rootScope.url='';
    $scope.logowxAccount={};
    $scope.url='';
    $scope.firstLoad = false;
    $scope.reader = new FileReader(); //创建一个FileReader接口
    $scope.thumb; //用于存放图片的base64
    $scope.ajaxWb={};
    $scope.viewWx1=true;

    $scope.viewWx1=true;
    $scope.viewWx=function(){
        // $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchWxAccount);
        $scope.viewWx1=true;
        $scope.viewWb1=false;

    }
    $scope.viewWb=function(){
        //   $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchWbAccount);
        $scope.viewWx1=false;
        $scope.viewWb1=true;

    }





    $scope.editWbAccount=function(data){
         
        console.log(data);
        console.log(data.id);
        $scope.editwbimg=true;
        $scope.addwbimage=false;

        $scope.WbAccountName.flag=false;
        $scope.cmd = "update";
        $scope.wbformName = "编辑微博";
        $scope.ajaxWb =data;
        console.log( $scope.ajaxWb.id);
        $scope.logoweibo.id= data.id;

        console.log("  $scope.logoweibo.id",  $scope.logoweibo.id);
        $scope.logoweibo.logo=  data.logo;
        $scope.weibo=data;
        console.log("$scope.weibo",$scope.weibo);
        $("#wbAccount").modal("show");



    }
    $scope.deleteWbAccount=function(WbAccount){
        console.log("WxAccount",WbAccount);
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
            wid= WbAccount.id;
            $rootScope.loading = true;
            $http({
                method: "DELETE",
                url: "wb/account/" + wid
            }).then(function (response) {
                $rootScope.loading = false;
                $scope.searchWbAccount();
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

    $scope.setAccountStatus=function(WxAccount){

     alert("adadda1");
     console.log(WxAccount.tempstatus);
   /*     if(WxAccount.tempstatus==true){
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
                $scope.searchWxAccount();
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
            console.log(response);

        })*/
    }
    $scope.shouquanwbuser=function(WbAccount){
        $scope.wbid=WbAccount.id;
        $scope.groupName='微博用户授权使用';
        $("#wbgroupModal").modal('show');
        $http({
            method:"GET",
            url:"wb/account/wbUser/"+ $scope.wbid
        }).then(function(response){
            console.log(response);
            if(response.data.status===0){
                $scope.wbuserList = response.data.object;
                console.log("$scope.wbuserList ",$scope.wbuserList );
            }else{
                gpPrompt.error({text:response.data.msg});
            }

        });


    }

            $scope.wxGiveUser=function(WxAccount){
        $scope.wxid=WxAccount.id;
        $scope.groupName='微信用户授权使用';
                $("#weixingroupModal").modal('show');
                $http({
                    method:"GET",
                    url:"wx/account/wxUser/"+ $scope.wxid
                }).then(function(response){
                    console.log(response);
                    if(response.data.status===0){
                        $scope.userList = response.data.object;
                        console.log("$scope.userList ",$scope.userList );
                    }else{
                        gpPrompt.error({text:response.data.msg});
                    }

                });

            };
    $scope.unSelectUser = function(user){
        user.status = 0;
    };
    $scope.selectUser = function(user){
        user.status = 1;
    };
    $scope.addAllUser = function(userList){
        angular.forEach(userList, function(data,index,array){
            data.status = 1;
        });
    };
    $scope.removeAllUser = function(userList){
        angular.forEach(userList, function(data,index,array){
            data.status = 0;
        });
    };


    $scope.updateShouquanWb=function(){
    var choosedUserIDArray = [];

    console.log($scope.wbuserList);
    angular.forEach($scope.wbuserList, function(data,index,array){
        if(data.status==1){
            choosedUserIDArray.push(data.id);
        }
    });
    var choosedUserIDStr = choosedUserIDArray.join(",");

    $rootScope.loading = true;
    console.log(choosedUserIDStr);
    $http({
        method: "POST",
        url: "wb/account/updateshouquanWb",
        data: {wb:$scope.wbid, userids: choosedUserIDStr},
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
        if (response.data.status === 0) {
            gpPrompt.ok({text: response.data.msg});
            $("#wbgroupModal").modal('hide');

        } else {
            gpPrompt.error({text: response.data.msg});
        }
    });

}

    $scope.updateShouquanWx=function(){

        var choosedUserIDArray = [];

console.log($scope.userList);
        angular.forEach($scope.userList, function(data,index,array){
            if(data.status==1){
                choosedUserIDArray.push(data.id);
            }
        });
        var choosedUserIDStr = choosedUserIDArray.join(",");

        $rootScope.loading = true;
console.log(choosedUserIDStr);
        $http({
            method: "POST",
            url: "wx/account/updateshouquanWx",
            data: {wx:$scope.wxid, userids: choosedUserIDStr},
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
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
                $("#weixingroupModal").modal('hide');

            } else {
                gpPrompt.error({text: response.data.msg});
            }
        });

    }

    $scope.removeAllUser = function(userList){
        angular.forEach(userList, function(data,index,array){
            data.status = 0;
        });
    };

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
    $http({
        method:'GET',
        url: 'wx/content/geturl',
    }).then(function (response) {
        if(response.data.status==0){
            $scope.path=response.data.object[0];
            $scope.wxurl=response.data.object[1];
     console.log("$scope.wxurl",$scope.wxurl);

        }else{
            gpPrompt.error({text: response.data.msg});
        }


    })

    $scope.searchWxAccount = function () {
        $http({
            method: 'POST',
            url: 'wx/account/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.WxAccountList = response.data.page.list;
                angular.forEach( $scope.WxAccountList, function(data,index,array){
                    if(data.status==0){
                        data.tempstatus = false;
                    }else{
                        data.tempstatus = true;
                    }
                });

                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
        });
    };


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


    /*删除图片*/
    $scope.deleteFile = function(){
        $scope.WxAccount.logo = null;
       // $scope.weibo.logo = null;

    };

    console.log(" $rootScope.loginUser", $rootScope.loginUser);
    $http({
        method: 'GET',
        url: 'wb/account/geturl'
    }).then(function (response) {
        if (response.data.status === 0) {
            $scope.url=  response.data.message;
            $rootScope.url=$scope.url;

        } else {
            gpPrompt.error({text: response.data.msg});
        }})

    $scope.addAccount=function () {
        $scope.logoweibo==null;
        $scope.logowxAccount==null;
        $scope.viewAccount=true;
        $scope.view=false;


    }




    $scope.  viewAllAccount=function(){
        $scope.viewAccount=false;
        $scope.view=true;
        $scope.WxAccount={};
        $scope.WbAccount={};
    }
    $scope.addWXAccount=function () {
         
        $scope.logowxAccount={id:null,logo:null};
        $scope.addimage=true;
        $scope.editimg=false;
        $scope.imgSrc='';
        $scope.WxAccountName.flag=false;
        $scope.WxAccount={type:'-1',authentication:'-1'};
        $scope.wechatPublicNumber = {};
        $scope.formName = "绑定微信公众号";
        $scope.cmd = "create";
        $("#weixinPublishNumber").modal("show");
        console.log("$scope.logowxAccount",$scope.logowxAccount);


    }

    $scope.addWBAccount=function(){
        $scope.logoimageFile={};
        $scope.WbAccountName.flag=false;
        $scope.weibo={};

        $scope.logoweibo={id:null,logo:null};

        $scope.editwbimg=false;
        $scope.addwbimage=true;
        $scope.cmd = "create";
        $scope.wbformName = "新建微博";
        $scope.cmd = "create";

        $("#wbAccount").modal("show");



    }

    $scope.getUUID=function(){
        $http({
            method: 'GET',
            url: 'wb/account/uuid'
        }).then(function (response) {
         if(response.data.status==0){
             $scope.uuid=response.data.object;
         }
        });

    }

    $scope.shouquan=function(data){
        console.log(data);
        window.location.href="https://api.weibo.com/oauth2/authorize?client_id="+data.clientID+"&response_type=code&redirect_uri="+$scope.url+"&state="+data.id;
    }


$scope.forbiddenWbAccount=function(wbstatus){
    if(wbstatus.status==0){
        url1="wb/account/activeAccount/"+wbstatus.id;
    }else{
        url1="wb/account/desableAccount/"+wbstatus.id;
    }
    $http({
        method:"POST",
        url:url1,
    }).then(function (response) {
        $rootScope.loading = false;
        $scope.searchWbAccount();
        if (response.data.status === 0) {
            gpPrompt.ok({text: response.data.msg});
        } else {
            gpPrompt.error({text: response.data.msg});
        }
    }, function (response) {
        console.log(response);

    })



}

    $scope.submitWeiboForm=function(){
        if(!$("#wbAccountForm").valid()){
            return;
        }
        if ($scope.cmd === "create") {

            $scope.ajaxWb=$scope.weibo;
            $scope.ajaxWb.logo=$scope.logoweibo.logo;
            $scope.ajaxWb.id= $scope.logoweibo.id;
            console.log(" $scope.ajaxWb", $scope.ajaxWb);
            var s =encodeURI(encodeURI($scope.ajaxWb.name)) ;
            console.log("s "+s );

            window.location.href="https://api.weibo.com/oauth2/authorize?client_id="+$scope.ajaxWb.clientID+"&response_type=code&redirect_uri="+$scope.url+"&state="+$scope.ajaxWb.clientID+","+$scope.ajaxWb.clientSecret+","+$rootScope.loginUser.name+","+s+","+$scope.ajaxWb.id+","+$scope.ajaxWb.logo;
           $scope.logoweibo={};

        }else if($scope.cmd === "update"){
            $scope.ajaxWb=$scope.weibo;

            $scope.ajaxWb.logo=$scope.logoweibo.logo;
            $scope.ajaxWb.id= $scope.logoweibo.id;
            $http({
                method:'POST',
                url:'wb/account/'+ $scope.ajaxWb.id,
                data:{clientid: $scope.ajaxWb.clientID,logo:$scope.ajaxWb.logo,name:$scope.ajaxWb.name,clientSecret:$scope.ajaxWb.clientSecret},
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
                    gpPrompt.ok({text: response.data.msg});
                    $scope.logowxAccount={};
                    $scope.searchWbAccount();
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

                $("#wbAccount").modal("hide");
                $scope.searchWbAccount();
                $scope.logoweibo={};

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });


            $scope.logoweibo={};

        }
    }

    $scope.$on("$destroy", function() {
        // 关闭页面时要做的事

        $scope.logowxAccount==null;
        $scope.logoweibo==null;
    })

    /*检查微信公众号是否重复*/
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
    /*检查微博公众号是否重复*/
    $scope.$watch("weibo.name", function (newValue, oldValue) {
        if ($scope.cmd === "update" && newValue === $scope.ajaxWb.name) {
            return;
        }

        if (newValue && newValue !== '') {

            $http({
                method: 'GET',
                url: 'wb/account/check/'+newValue
            }).then(function (response) {
                $scope.WbAccountName.flag = !response.data
                console.log(" $scope.WbAccountName", $scope.WbAccountName);

            });
        }
    });

    /*微信保存*/
    $scope. submitWxAccountForm=function () {

        if(!$("#weixinPublishNumberForm").valid()){
            return;
        }
        if ($scope.cmd === "create") {

            $scope.ajaxWxAccount=$scope.WxAccount;
            console.log(" $scope.ajaxWxAccount", $scope.ajaxWxAccount);
            $http({
                method:'POST',
                url: 'wx/account/create',
                data:{id: $scope.logowxAccount.id,logo:$scope.logowxAccount.logo, type: $scope.ajaxWxAccount.type,authentication:$scope.ajaxWxAccount.authentication,originalId:$scope.ajaxWxAccount.originalId,
                    appId:$scope.ajaxWxAccount.appId,appSecret:$scope.ajaxWxAccount.appSecret,name:$scope.ajaxWxAccount.name},
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function(obj) {
                    var str = [];
                    for(var p in obj){
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    }
                    return str.join("&");
                }
            }).then(function (response) {
                console.log("response",response);

                    if (response.data.status === 0) {
                   // gpPrompt.ok({text: response.data.msg});
                    $scope.logowxAccount={};

                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

                $("#weixinPublishNumber").modal("hide");
                $scope.searchWxAccount();

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });

        }else if ($scope.cmd === "update") {
            $scope.ajaxWxAccount=$scope.WxAccount;

            $http({

                method:'POST',
                url: 'wx/account/update',
                data:{id: $scope.logowxAccount.id,logo:$scope.logowxAccount.logo,type: $scope.ajaxWxAccount.type,authentication:$scope.ajaxWxAccount.authentication,originalId:$scope.ajaxWxAccount.originalId,
                    appId:$scope.ajaxWxAccount.appId,appSecret:$scope.ajaxWxAccount.appSecret,name:$scope.ajaxWxAccount.name},
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
                    $scope.WxAccount.logo= response.data.object;
                    gpPrompt.ok({text: response.data.msg});
                    $scope.logowxAccount={};
                    $scope.searchWxAccount();
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

                $("#weixinPublishNumber").modal("hide");
                $scope.searchWxAccount();

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });




        }
        $scope.logowxAccount={};

    }
    /*微信检查*/

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
                type:'帐号类型必选',


            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            }
        });
    }
    /*微博*/
    function initValidatewbAccountForm() {

        const wbAccountForm = $('#wbAccountForm');
        wbAccountForm.validate({
            errorElement: 'span',
            errorClass: 'help-block help-block-error',
            focusInvalid: false,
            ignore: "",
            rules: {
                name: {
                    required: true
                },
                clientID: {

                    required: true
                },
                clientSecret: {
                    required: true
                }

            },
            messages: {
                name: '用户名必填',
                authentication:'应用ID必填',
                type:'应用密钥必填'


            },
            highlight: function (element) {
                $(element).closest('.form-group').addClass('has-error');
            },
            unhighlight: function (element) {
                $(element).closest('.form-group').removeClass('has-error');
            }
        });
    }
    $scope.editWxAccount=function(WxAccount){
         
        $scope.imgSrc='';
        $scope.editimg=true;
        $scope.logowxAccount=WxAccount;
        $scope.addimage=false;
        var ta= WxAccount.type+"";
        var aa= WxAccount.authentication+"";

        $scope.WxAccountName.flag=false;
        $scope.WxAccount=WxAccount;
        $scope.WxAccount.type=ta;
        $scope.WxAccount.authentication=aa;
        $scope.sourceAccount =WxAccount;

        $scope.formName="编辑公众号";
        $scope.cmd="update";
        console.log("$scope.WxAccount",$scope.WxAccount);
        $("#weixinPublishNumber").modal("show");
        $scope.searchWxAccount();

    }
    $scope.$watch("WxAccount.logo", function (newValue, oldValue) {
             
            console.log(newValue);
        console.log(oldValue);
  if(!newValue){
      $scope.logowxAccount=={};

  }


                if($scope.cmd === "create"&&newValue!=null){
                    if(oldValue==null){
                        $scope.logowxAccount={};
                    }
                    Upload.upload({
                        url: 'wx/account/createlogo',
                        data:{ },
                        file:newValue
                    }).then(function (response) {
                        if (response.data.status === 0) {

                           $scope.logowxAccount=response.data.object;
                        console.log("$scope.logowxAccount",$scope.logowxAccount);
                        } else {
                            gpPrompt.error({text: response.data.msg});
                        }
                        $rootScope.loading = false;

                    }, function (response) {
                        alert("操作异常，请稍后重试！");
                        console.log(response);
                    });

                }




        if ($scope.cmd === "update"&&newValue.name) {
            console.log(newValue);
            Upload.upload({
                url: 'wx/account/createlogo',
                data:{id:$scope.WxAccount.id},
                file:newValue
            }).then(function (response) {
                if (response.data.status === 0) {

                    $scope.logowxAccount=response.data.object;
                    console.log("$scope.logowxAccount",$scope.logowxAccount);
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });

            $scope.editimg=false;
            $scope.addimage=true;
        }
    });

    $scope.$watch("weibo.logo", function (newValue, oldValue) {
         
        if($scope.cmd === "create"&&newValue!=null){
            if(oldValue==null){
                $scope.logoweibo={id:null,logo:null};
            }
            Upload.upload({
                url: 'wb/account/logo',
                data:{id:$scope.uuid},
                file:newValue
            }).then(function (response) {
                if (response.data.status === 0) {

                    $scope.logoweibo=response.data.object;
                    console.log("$scope.logoweibo",$scope.logoweibo);
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });

        }
        if ($scope.cmd === "update"&&newValue.name) {
            Upload.upload({
                url: 'wb/account/logo',
                data:{id:$scope.weibo.id},
                file:newValue
            }).then(function (response) {
                if (response.data.status === 0) {

                    $scope.logoweibo=response.data.object;
                    console.log("$scope.logoweibo",$scope.logoweibo);;
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
                $rootScope.loading = false;

            }, function (response) {
                alert("操作异常，请稍后重试！");
                console.log(response);
            });

            $scope.editimg=false;
            $scope.addimage=true;
        }

    });

  /*  $scope.getcurrentUser=function(){
        $http({
            method:'GET',

        })
    }*/

    $scope.$watch('wbpageConf.currentPage+wbpageConf.pageSize', $scope.searchWbAccount);
    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchWxAccount);

    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.getUUID();
      /*  $scope.getcurrentUser();*/

        $scope.searchWbAccount();
        $scope.searchWxAccount();
       /* initValidatewbAccountForm();
        initValidateweixinPublishNumberForm();*/
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });

});
