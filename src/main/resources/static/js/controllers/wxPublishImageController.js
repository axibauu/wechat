angular.module('MetronicApp').controller('wxPublishImageController', function ($stateParams,$rootScope,$state, $scope, $filter,settings, $http, gpPrompt,Upload, pageUtil) {
    var init1Time = new Date();
    $scope.initTime = {};
    $scope.id={};
    var dateAsString = $filter('date')(init1Time, "yyyy-MM-dd HH:mm");
    console.log(dateAsString);
    $scope.initTime = dateAsString;
    $scope.message = {};
    $scope.imageFile1={};
    $scope.imagebind="新建图片信息"
    $scope.firstLoad = false;
    $scope.imageFile = null;
    $scope.cmd="new";
    $scope.reader = new FileReader(); //创建一个FileReader接口
    $scope.thumb; //用于存放图片的base64
    console.log("$rootScope.publishWx",$rootScope.publishWx);
    var a=new Array();
    a= $rootScope.publishWx;
    $scope.editmessage={};
    if( $stateParams.cmd=="edit"){
        $scope.imagebind="编辑图片信息"
        $scope.firstLoad = true;
        $rootScope.publishWx=
            $scope.cmd = "edit";
        $scope.editmessage=$stateParams.data;
        $rootScope.publishWx=$scope.editmessage.wxAccountID;
        console.log("  $scope.editmessage",  $scope.editmessage);
        $scope.id=$scope.editmessage.id;
        $scope.imageFile= $scope.editmessage.image;
        $scope.imageFile1.imgtitle=$scope.editmessage.image.imagetitle;
        $scope.message.publishDate=$scope.editmessage.publishDate;
        console.log("  $scope.imageFile",  $scope.imageFile);

    }

    if(!$rootScope.publishWx){
        $state.go("wxPublishSetting");
        gpPrompt.error({text:'请选择要发送图片的微信帐号'});


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

    $scope.uploadFiles = function(file, errorFile) { //单次提交图片的函数
        $scope.reader.readAsDataURL(file); //FileReader的方法，把图片转成base64

        $scope.reader.onload = function(ev) {
            console.log("file",  file);
            $scope.$apply(function() {
                $scope.thumb = ev.target.result; //接收base64
            });
            $scope.imgSrcz = $scope.thumb;


        };
    };



    /*删除图片*/
    $scope.deleteFile = function(){
        $scope.imageFile = null;
        $scope.firstLoad = false;
    };

    /*保存草稿*/
    $scope.saveForm = function(){

        if(!$scope.firstLoad){

            if(!$scope.imageFile1.imgtitle){
                gpPrompt.error({text:"请输入图片标题"});///
                return ;
            }
            if($scope.imageFile==null){
                gpPrompt.error({text:"请上传图片"});///
                return ;
            }
        }
        $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'save',imgtitle:$scope.imageFile1.imgtitle,publishDate:$scope.message.publishDate});
    };
    /*提交审核*/
    $scope. submitAudit=function(){

        if(!$scope.firstLoad){
            if(!$scope.imageFile1.imgtitle){
                gpPrompt.error({text:"请输入图片标题"});///
                return ;
            }
            if($scope.imageFile==null){
                gpPrompt.error({text:"请上传图片"});///
                return ;
            }
        }


        $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',imgtitle:$scope.imageFile1.imgtitle,publishDate:$scope.message.publishDate});
    }

    /*定时发送*/
    $scope.submitTimerForm = function(){
        if(!$scope.firstLoad){
            if(!$scope.imageFile1.imgtitle){
                gpPrompt.error({text:"请输入图片标题"});///
                return ;
            }
            if($scope.imageFile==null){
                gpPrompt.error({text:"请上传图片"});///
                return ;
            }
        }
        if(!$scope.message.publishDate){
            gpPrompt.error({text:"请输入发送时间"});
            return ;
        }
        $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',imgtitle:$scope.imageFile1.imgtitle,publishDate:$scope.message.publishDate});
    };


    /*立即发送*/
    $scope.submitForm = function(){


        console.log("$scope.imageFile",$scope.imageFile);
        if(!$scope.firstLoad){
            if(!$scope.imageFile1.imgtitle){
                gpPrompt.error({text:"请输入图片标题"});///
                return ;
            }
            if($scope.imageFile==null){
                gpPrompt.error({text:"请上传图片"});///
                return ;
            }
        }
        $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',imgtitle:$scope.imageFile1.imgtitle,publishDate:""});
    };
    $scope.doSubmitForm = function(data){
        $scope.$broadcast("submitForm", data);
    };


    $scope.$on("submitForm", function (event, data) {

        if("submit_new"==data.cmd){
            $rootScope.loading = true;
            if( !$rootScope.publishWx){
                gpPrompt.error({text:'请选择帐号'})
                window.history.go(-1);
                return;
            }
            if( !$scope.imageFile){
                gpPrompt.error({text:'请选择图片'})
                window.history.go(-1);
                return;
            }
            var array=new Array();
            array=  $rootScope.publishWx;
            var  starray= array.join(",");

            console.log("$scope.imageFile",$scope.imageFile);


            Upload.upload({
                url: "wx/content/"+starray+"/create",
                data: {type:2,publishDate:data.publishDate,cmd:data.realCmd,imgtitle:$scope.imageFile1.imgtitle},
                file: $scope.imageFile,
            }).then(function(response) {        // file is uploaded
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                    window.history.go(-1);
                } else {
                    gpPrompt.error({text: response.data.msg});
                    window.history.go(-1);
                }

            });
        }else if("submit_edit"==data.cmd){
            $rootScope.loading = true;

            /*   var array=new Array();
               array=  $rootScope.publishWx;
               var  starray= array.join(",");*/
            if($scope.firstLoad){
                $http({
                    url:"wx/content/"+$rootScope.publishWx+"/update",
                    method:"POST",
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    data:{cmd:data.realCmd,type:2,publishDate:data.publishDate,imgPath:$scope.imageFile.imgUrl,imgtitle:$scope.imageFile1.imgtitle,id:$scope.id}
                }).then(function(response){
                    $rootScope.loading = false;
                    if(response.data.status==0){
                        gpPrompt.ok({text: response.data.msg});
                        window.history.go(-1);
                    }else{
                        gpPrompt.error({text:response.data.msg})
                        window.history.go(-1);
                    }
                });
            }else{
                Upload.upload({
                    url:"wx/content/"+$rootScope.publishWx+"/update",
                    data: {id:$scope.id,type:2,publishDate:data.publishDate,cmd:data.realCmd,imgtitle:$scope.imageFile1.imgtitle},
                    file: $scope.imageFile,
                }).then(function(response){
                    if(response.data.status==0){
                        gpPrompt.ok({text: response.data.msg});
                        window.history.go(-1);
                    }else{
                        gpPrompt.error({text:response.data.msg})
                        window.history.go(-1);
                    }

                });
            }

        }
    });


})