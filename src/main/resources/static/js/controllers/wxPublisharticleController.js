angular.module('MetronicApp').controller('wxPublisharticleController', function ($stateParams,$timeout ,$filter,Upload,$rootScope,$state, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.wxurl='';
    $scope.path='';
    var init1Time = new Date();
    $scope.errorDetect={};
    $scope.initTime = {};
    $scope.id={};
    $scope.selectedNews = {
        content:null,
        title:null,
        thumbImageName:null
    };

    var dateAsString = $filter('date')(init1Time, "yyyy-MM-dd HH:mm");
    console.log(dateAsString);
    $scope.initTime = dateAsString;
    $scope.cmd='new';
    $scope.newsList = [];

    $scope.$on("$destroy", function() {
        // 关闭页面时要做的事
        UE.getEditor('WxMsgContent').destroy();
    })
    $scope.getInfo=function () {

        var ue =   UE.getEditor('WxMsgContent');
        if( $stateParams.cmd=="edit"){

                    $scope.firstLoad = true;
                    $scope.cmd = "edit";
                    $scope.editmessage=$stateParams.data;
                    $scope.id=$scope.editmessage.id;
                    $rootScope.publishWx=$scope.editmessage.wxAccountID;
$scope.editList=$filter('orderBy')($scope.editmessage.newsList,'sortID');

                    angular.forEach( $scope.editList,function(obj,index){
                        $scope.selectedNews={id:obj.id,
                            wxContentID:obj.wxContentID,
                            content:obj.content,
                            title:obj.title,
                            author:obj.author,
                            sortID:obj.sortID,
                            digest:obj.digest,
                            content_source_url:obj.content_source_url,
                            thumbImageName:obj.thumbImageName
                        }

                        $scope.newsList.push($scope.selectedNews);
                    });

                    console.log($scope.newsList);
                  ue.addListener("ready", function () {
                        console.log("$scope.selectedNews.content",$scope.selectedNews.content);

                        ue.setContent( $scope.selectedNews.content);
                    });


                }
      else {
            if("new"==$scope.cmd){
                $scope.initNewsList();

            }

        }
        if(!$rootScope.publishWx){
            $state.go("wxPublishSetting");
            gpPrompt.error({text:'请选择要发送图文的微信帐号'});


        }

        $http({
            method:'GET',
            url: 'wx/content/geturl',
        }).then(function (response) {
            if(response.data.status==0){
                $scope.path=response.data.object[0];
                $scope.wxurl=response.data.object[1];
                if($scope.cmd=="new"){
                    $scope.wxpublishurl=$scope.wxurl+'/wx/'+$rootScope.publishWx[$rootScope.publishWx.length-1];
                }
                if($scope.cmd=="edit"){
                    $scope.wxpublishurl=$scope.wxurl+'/wx/'+$rootScope.publishWx;
                    console.log( $scope.wxpublishurl," $scope.wxpublishurl");
                }
                console.log("$rootScope.publishWx[0]",$rootScope.publishWx[0]);

                console.log(" $scope.wxpublishurl", $scope.wxpublishurl);
                console.log("$scope.wxurl",$scope.wxurl);

            }else{
                gpPrompt.error({text: response.data.msg});
            }
        })

    }




    $scope.initNewsList=function () {
        $scope.newsList = [];
        $scope.newsList.push({id:$scope.generateID()});

        $scope.selectNews($scope.newsList[0]);
    }



    $scope.generateID = function(){
        return new Date().getTime();
    };
    $scope.currentnews={id:$scope.generateID()};

    $scope.findLastSelectNews=function(){

        angular.forEach($scope.newsList,function (value,key) {
            $scope.currentnews=value;
            console.log( $scope.currentnews);
        })

    }
    $scope.selectNews = function(news){

      if(news.id== $scope.currentnews.id){

            $scope.selectedNews=  $scope.currentnews;
        }else{
            $scope.selectedNews = news;
        }
        console.log("$scope.selectedNews.content",$scope.selectedNews);
        UE.getEditor('WxMsgContent').ready(function() {
            UE.getEditor('WxMsgContent').setContent($scope.selectedNews.content||"");
        });
    };

    $scope.generateID = function(){
        return new Date().getTime();
    };


    $scope.confirmNewsContent = function(){
        $scope.selectedNews.content = UE.getEditor('WxMsgContent').getContent();
        console.log(" $scope.selectedNews.content", $scope.selectedNews.content);
        //$("#newsContent").html($scope.selectedNews.content);
        $("#myWxContentModal").modal('hide');
    };

    $scope.getEditor=function(){
        UE.getEditor('WxMsgContent').addListener("blur",function(){
            var editor=UE.getEditor('WxMsgContent').getContent();
            $scope.currentnews.content=editor;


        })
    }
    /*增加图文*/
    $scope.addNews = function(){

        if($scope.newsList.length<8){
            $scope.selectedNews.content = UE.getEditor('WxMsgContent').getContent();
            console.log("$scope.selectedNews.content",$scope.selectedNews.content);
            $scope.selectedNews = {id:$scope.generateID(),title:""};
            $scope.currentnews= $scope.selectedNews;
            console.log("$scope.selectedNews",$scope.selectedNews);
            $scope.newsList.push($scope.selectedNews);
            console.log(" $scope.newsList", $scope.newsList);
           UE.getEditor('WxMsgContent').setContent("");

        }







    };

    $scope.getEditor=function(){
        UE.getEditor('WxMsgContent').addListener("blur",function(){
            var editor=UE.getEditor('WxMsgContent').getContent();
            $scope.currentnews.content=editor;


        })
    }
$scope.wordDetection=function(){
   
        var editorContent = UE.getEditor('WxMsgContent').getContentTxt();
    if(!(editorContent)){
        gpPrompt.ok({text:'没有内容'});
        return;
    }

    var reg = /\d{6}/;


     var aa =reg.test(editorContent);
    if(!reg.test(editorContent)){
            gpPrompt.ok({text:'文本中没有检测出敏感词'});
            return;

    }else{
      var result=  editorContent.match(reg)[0];

        $scope.errorList = [];


            var errorWord = "";
            var correctWord = "";
            var errors = [];

                /*errorWord = y;
                correctWord = result[x][y];*/
                errors.push({errorWord:result,correctWord:""});
                $scope.errorList.push({sentence:result,errors:errors,show:false,correct:false});


            //$scope.errorList.push({sentence:x,errorWord:errorWord,correctWord:correctWord,show:false,correct:false});
            $("#contentCorrect_body").html(editorContent);
            $scope.showErrorDetail($scope.errorList[0]);
            $("#contentCorrectModal").modal("show");

    }
}


    $scope.doCorrectContent = function(){

            var editorContent = UE.getEditor('WxMsgContent').getContentTxt();
            if(!(editorContent)){
                gpPrompt.error({text:'没有内容'});
                return;
            }
        $.ajax({
            url:"wx/content/getEncryptContent",
            dataType:"json",
            async:false,
            method:"POST",
            data: {content:editorContent},
            success:function(response){

                $scope.errorDetect.url = response.object.url;
                $scope.errorDetect.content = response.object.encryptContent;
            }
        });


        var result = null;


        $.ajax({
                url:  $scope.errorDetect.url,//"http://47.93.25.59:18642/check",
                type: "POST",
                dataType:"json",
                async:false,
                data:{content:$scope.errorDetect.content},

                success: function (data) {
                    result = data;
                }
            });

            if(result==null || $.isEmptyObject(result)){
                gpPrompt.ok({text:'文本中没有检测出错误'});
                return;
            }
            $scope.errorList = [];
            for(x in result){

                var errorWord = "";
                var correctWord = "";
                var errors = [];
                for(y in result[x]){
                    errorWord = y;
                    correctWord = result[x][y];
                    errors.push({errorWord:errorWord,correctWord:correctWord});
                }
                $scope.errorList.push({sentence:x,errors:errors,show:false,correct:false});
                //$scope.errorList.push({sentence:x,errorWord:errorWord,correctWord:correctWord,show:false,correct:false});
            }
            $("#contentCorrect_body").html(editorContent);
            $scope.showErrorDetail($scope.errorList[0]);
            $("#contentCorrectModal").modal("show");

        }


    $scope.showErrorDetail = function(error){
        var curContent = $("#contentCorrect_body").html();

        if($scope.currentError!=null){
            $scope.currentError.show = false;
            var replaceContent = $scope.currentError.sentence;
            if($scope.currentError.correct==true){
                replaceContent = $scope.currentError.rightSentence;
            }
            curContent = curContent.replace("<span style=\"background-color: yellow;color:red;\">"+replaceContent+"</span>",replaceContent);
        }

        error.show = true;
        $scope.currentError = error;
        var replaceContent = error.sentence;
        if($scope.currentError.correct==true){
            replaceContent = error.rightSentence;
        }

        curContent = curContent.replace(replaceContent,"<span style=\"background-color: yellow;color:red;\">"+replaceContent+"</span>");
        $("#contentCorrect_body").html(curContent);
    };

    $scope.correctAllErrorAndSave = function(){
        angular.forEach($scope.errorList,function(error,index,array){
            $scope.doError(error);
        });
        $scope.saveCorrect();
    };
    $scope.doError = function(error){
        if(error.correct){
            return;
        }
        var curContent = $("#contentCorrect_body").html();
        var rightSentence = error.sentence;
        for(var i=0;i<error.errors.length;i++){
            var info = error.errors[i];
            rightSentence = replaceAll(rightSentence,info.errorWord, info.correctWord);
        }
        curContent = curContent.replace(error.sentence,rightSentence);
        $("#contentCorrect_body").html(curContent);
        error.correct = true;
        error.rightSentence = rightSentence;
    };
    $scope.saveCorrect = function(){
        var unCorrectList = $filter('filter')($scope.errorList, { correct: false});
        if(unCorrectList.length>0){
            gpPrompt.confirm({text:"还有"+unCorrectList.length+"个错误未修改，确定保存？",yes:function(){
                    $scope.useCorrectToContent();
                },no:function(){}});
        }else{
            $scope.useCorrectToContent();
        }
    };

    $scope.cancelError = function(error){
        if(!error.correct){
            return;
        }
        var curContent = $("#contentCorrect_body").html();
        //var errorSentence = replaceAll(error.rightSentence,error.correctWord, error.errorWord);
        curContent = curContent.replace(error.rightSentence, error.sentence);
        $("#contentCorrect_body").html(curContent);
        error.correct = false;
    };
    function replaceAll(content,findText,repText){
        console.log(content,findText,repText);
        //content = content.replace(/findText/g,repText);
        //return content;
        return content.replace(new RegExp(findText, "gm"), repText);
    }
    $scope.useCorrectToContent = function(){
        console.log("应用到编辑器中");
        var editorContent = UE.getEditor('WxMsgContent').getContent();
        angular.forEach($scope.errorList,function(error,index,array){
            if(error.correct==true){
                editorContent = editorContent.replace(error.sentence,error.rightSentence);
            }
        });
        UE.getEditor('WxMsgContent').setContent(editorContent);
        $("#contentCorrectModal").modal("hide");
    };
    $scope.checkEditor=function(){
        $scope.editorcontent = UE.getEditor('WxMsgContent').getContent();

        $http({
            method:"POST",
            url:"wx/content/checkContent",
            data: {content:$scope.editorcontent},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            $rootScope.loading = false;

            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
            console.log(response);

        })


    }

    UE.getEditor('WxMsgContent').ready(function() {

        $scope.currentnews.content= UE.getEditor('WxMsgContent').getContent();
    });
    $scope.selectNews = function(news){

        if(news.id== $scope.currentnews.id){

            $scope.selectedNews=  $scope.currentnews;
        }else{
            $scope.selectedNews = news;
        }
        console.log("$scope.selectedNews.content",$scope.selectedNews);
        UE.getEditor('WxMsgContent').ready(function() {
            UE.getEditor('WxMsgContent').setContent($scope.selectedNews.content||"");
        });
    };

    $scope.findLastSelectNews=function(){

        angular.forEach($scope.newsList,function (value,key) {
            $scope.currentnews=value;
        })

    }



//删除图文
    $scope.removeContent = function(id){
        gpPrompt.confirm('删除操作不可撤销，确认删除？', function () {
            console.log(id);
            var curIndex = 0;

            $timeout(function () {
                var curIndex = 0;
                $timeout(function () {
                    var curIndex = 0;
                    $scope.newsList = $.grep($scope.newsList, function (n, i) {
                        if (n.id != id) {
                            return true;
                        } else {
                            curIndex = i;
                            return false;
                        }

                    });
                    $scope.selectedNews = $scope.newsList[curIndex - 1];
                    UE.getEditor('WxMsgContent').addListener("ready", function () {
                        // editor准备好之后才可以使用
                        UE.getEditor('WxMsgContent').setContent($scope.selectedNews.content||"");
                    });
                })
            }); });
    };
    //上移图文
    $scope.upContent = function(index){
        if(index>0){
            var cIndex = $scope.newsList[index];
            $scope.newsList[index] = $scope.newsList[index-1];
            $scope.newsList[index-1] = cIndex;
        }else{
            cmsPrompt.tip({text:"第一篇图文不能上移",time:1000});
        }
    };

    //下移图文
    $scope.downContent = function(index){
        if(index<$scope.newsList.length-1){
            var cIndex = $scope.newsList[index];
            $scope.newsList[index] = $scope.newsList[index+1];
            $scope.newsList[index+1] = cIndex;
        }else{
            cmsPrompt.tip({text:"最后一篇图文不能下移",time:1000});
        }
    };

    $scope.close=function(){
        $state.go("wxPublishSetting");
    }

    /*保存草稿*/
    $scope.saveForm = function(){

        $scope.selectedNews.content =  UE.getEditor('WxMsgContent').getContent();
        console.log(" $scope.selectedNews.content", $scope.selectedNews.content);
        var flag = false;
        for(var i=0;i<$scope.newsList.length;i++){
            var news = $scope.newsList[i];
            if(!(news.thumbImageName)){
                gpPrompt.error({text:"请上传第"+(i+1)+"个图文的封面"});
                flag = true;
                break;
            }
            if(!(news.title)){
                gpPrompt.error({text:"请输入第"+(i+1)+"个图文的标题"});
                flag = true;
                break;
            }
            if(!(news.content)){
                gpPrompt.error({text:"请填写第"+(i+1)+"个图文的内容"});
                flag = true;
                break;
            }
        }
        if(!flag){
            $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'save',publishDate:$scope.message.publishDate});
        }

    };
    /*-------------------------------------------------------------*/
    /*提交审核*/
    $scope. submitAudit=function(){
        $scope.selectedNews.content = UE.getEditor('WxMsgContent').getContent();
        console.log(" $scope.selectedNews.content", $scope.selectedNews.content);
        var flag = false;
        for(var i=0;i<$scope.newsList.length;i++){
            var news = $scope.newsList[i];
            if(!(news.thumbImageName)){
                gpPrompt.error({text:"请上传第"+(i+1)+"个图文的封面"});
                flag = true;
                break;
            }
            if(!(news.title)){
                gpPrompt.error({text:"请输入第"+(i+1)+"个图文的标题"});
                flag = true;
                break;
            }
            if(!(news.content)){
                gpPrompt.error({text:"请填写第"+(i+1)+"个图文的内容"});
                flag = true;
                break;
            }
        }
        if(!flag){
            $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',publishDate:$scope.message.publishDate});
        }

    }

    /*定时发送*/
    $scope.submitTimerForm = function(){
        $scope.selectedNews.content = UE.getEditor('WxMsgContent').getContent();
        if(!($scope.message.publishDate)){
            gpPrompt.error({text:"请输入发送时间"});
            return ;
        }
        var flag = false;
        for(var i=0;i<$scope.newsList.length;i++){
            var news = $scope.newsList[i];
            if(!(news.thumbImageName)){
                gpPrompt.error({text:"请上传第"+(i+1)+"个图文的封面"});
                flag = true;
                break;
            }
            if(!(news.title)){
                gpPrompt.error({text:"请输入第"+(i+1)+"个图文的标题"});
                flag = true;
                break;
            }
            if(!(news.content)){
                gpPrompt.error({text:"请填写第"+(i+1)+"个图文的内容"});
                flag = true;
                break;
            }
        }
        if(!flag){
            $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',publishDate:$scope.message.publishDate});
        }
    };
    /*立即发送*/
    $scope.submitForm = function(){
        $scope.selectedNews.content = UE.getEditor('WxMsgContent').getContent();
        var flag = false;
        for(var i=0;i<$scope.newsList.length;i++){
            var news = $scope.newsList[i];
            if(!news.thumbImageName){
                gpPrompt.error({text:"请上传第"+(i+1)+"个图文的封面"});
                flag = true;
                break;
            }
            if(!(news.title)){
                gpPrompt.error({text:"请输入第"+(i+1)+"个图文的标题"});
                flag = true;
                break;
            }
            if(!(news.content)){
                gpPrompt.error({text:"请填写第"+(i+1)+"个图文的内容"});
                flag = true;
                break;
            }
        }
        if(!flag){
            $scope.doSubmitForm({cmd:"submit_"+$scope.cmd,realCmd:'send',publishDate:null});
        }
    };
    $scope.doSubmitForm = function(data){
        $scope.$broadcast("submitForm", data);
    };
    $scope.doJsonList = function(list){
        console.log("list",list);
        var newList = [];
        for(i in list){
            var obj = list[i];
            var newObj = {};
            for(j in obj){
                //console.log(j,obj[j]);
                newObj[j] = obj[j]||"";
                if(j=="content"){
                    newObj[j] = encodeURIComponent(obj[j]||"");
                }
            }
            newList.push(newObj);
        }
        return newList;
    };
    $scope.$on("submitForm", function (event, data) {
        if('uploadThumbImage'==data.cmd){
          console.log("  $rootScope.publishWx",  $rootScope.publishWx);
            var arr=new Array();
            var arr=$rootScope.publishWx;
            if(arr.length>1){
                 acoundid=arr.join(",");
            }else {
                acoundid=arr[0];
            }
            $rootScope.loading = true;
            Upload.upload({
                method: 'POST',
                url: 'wx/content/uploadMedia',
                data: {accountID: acoundid,type:'thumb'},
                file: data.file,
            }).then(function (response) {
                if (response.data.status === 0) {
                    gpPrompt.ok({text: response.data.msg});
                    $scope.selectedNews.thumbImageName = response.data.object;
                    $scope.selectedNews.thumbImage = null;

                    console.log("  $scope.selectedNews",  $scope.selectedNews);
                } else {
                    gpPrompt.error({text: response.data.msg});
                }
            });
        }else if("submit_new"==data.cmd){
            $rootScope.loading = true;
            var arr=new Array();
            arr=$rootScope.publishWx;
            var acoundid=arr.join(",");
            var mpnews = angular.toJson($scope.doJsonList($scope.newsList));
            $http({
                url:"wx/content/"+acoundid+"/create",
                method:"POST",
                data:{cmd:data.realCmd,type:3,publishDate:'',mpnews:mpnews},
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
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
                    gpPrompt.ok({text: '操作成功'});

                }else{
                    console.log("2222");
                    gpPrompt.error({text:response.data.msg});


                }
               $state.go("wxPublishSetting");
                //window.history.go(-1);
            });


        }else if("submit_edit"==data.cmd){

            $rootScope.loading = true;
            var mpnews = angular.toJson($scope.doJsonList($scope.newsList));
            console.log("mpnews",mpnews);
            $http({
                url:"wx/content/"+$rootScope.publishWx+"/update",
                method:"POST",
                headers:{'Content-Type': 'application/x-www-form-urlencoded'},
                data:{cmd:data.realCmd,type:3,publishDate:data.publishDate,mpnews:mpnews,id:$scope.id},
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
                    gpPrompt.ok({text: '操作成功'});

                }else{
                    console.log("11111");
                    gpPrompt.error({text:response.data.msg});
                }
                $state.go("wxPublishSetting");

                //window.history.go(-1);
            });
        }
    });


    $scope.$watch('selectedNews.thumbImage',function(newValue, oldValue){

        if(newValue && newValue!=oldValue && $scope.selectedNews.thumbImage!=null){
            if((typeof newValue)=="object"){
                console.log("selectedNews.thumbImage",$scope.selectedNews.thumbImage);
                $scope.doSubmitForm({cmd:'uploadThumbImage',file:$scope.selectedNews.thumbImage});
            }

        }

    });

    $scope.$watch("selectedNews.content",function(newValue, oldValue){

        if(newValue && newValue!=oldValue){
          $scope.currentnews.content=UE.getEditor('WxMsgContent').getContent();
        }


    });




    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.getInfo();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;


    });



})