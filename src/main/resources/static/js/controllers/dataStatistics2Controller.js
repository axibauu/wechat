angular.module('MetronicApp').controller('dataStatistics2Controller', function ($rootScope, $state, $scope, settings, $http, gpPrompt, pageUtil) {
    $scope.pageConf = {currentPage: 1, pageSize: 10};
    $scope.wbpageConf = {currentPage: 1, pageSize: 10};
    $scope.QueryCriteria = {};
    $scope.account = {type: '1', list: '-1'};
    $scope.ajaxaccount = {};

    $scope.viewweixin = true;
    $scope.viewfans = false;
    $scope.viewarticle=false;
   /* $http({
        method: 'GET',
        url: "data/getTypeAccountList/1"
    }).then(function (response) {
        if (response.data.status === 0) {
            $scope.accountlist = response.data.object;
            console.log(" $scope.accountlist", $scope.accountlist);
        } else {
            gpPrompt.error({text: response.data.msg});
        }
        $rootScope.loading = true;
    });*/
    //我的数据
   $scope.viewMyData=function(){
       $scope.viewweixin = true;
       $scope.viewfans = false;
       $scope.viewarticle=false;
   }
$scope.viewFans=function(){
    $scope.viewweixin = false;
    $scope.viewfans = true;
    $scope.viewarticle=false;
}
$scope.viewArticle=function(){
    $scope.viewarticle=true; $scope.viewweixin = false;   $scope.viewfans = false;
}

   /*$scope.getarticle=function(){
       $http({
           method: 'POST',
           url: 'data/getStatistics/getarticle',
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
           if (response.data.status == 0) {
               $scope.articleSize = response.data.object;

               console.log("   $scope.articleSize", $scope.articleSize);
           } else {
               gpPrompt.ok({text: '正在抓取数据'});
           }
       });
   }*/

  $scope.selectTypeChange = function () {

        if ($scope.sourceaccout.type == 1) {
            $scope.viewweibo = false;
            $scope.viewweixin = true;
        } else {
            $scope.viewweibo = true;
            $scope.viewweixin = false;
            $http({
                method: 'POST',
                url: 'data/getStatistics',
                data: {
                    type: $scope.sourceaccout.type,
                    list: $scope.sourceaccout.list,
                    time: $scope.time,
                    fromtime: $scope.sourceaccout.frometime,
                    totime: $scope.sourceaccout.totime
                },
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
                if (response.data.status == 0) {
                    $scope.wbaccountList = response.data.object;

                    console.log("   $scope.wbaccountList", $scope.wbaccountList);
                } else {
                    gpPrompt.ok({text: '正在抓取数据'});
                }
            });


        }
        $scope.account.list = '-1';
        $scope.ajaxaccount = $scope.account;
        $http({
            method: 'GET',
            url: "data/getTypeAccountList/" + $scope.ajaxaccount.type
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.accountlist = response.data.object;
               // $scope.selectData();
                console.log(" $scope.accountlist", $scope.accountlist);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
            $rootScope.loading = true;

        })

    };

    $scope.selectAccountChange = function () {

        $scope.ajaxaccount.id = $scope.account.list;
        console.log("$scope.ajaxaccount.id", $scope.ajaxaccount.id);
    }

    $scope.selectButton = function () {
        console.log("$scope.account.time", $scope.account.time);
        console.log("$scope.account.time", $scope.account.time);

    }
    $scope.changetime5=function(){

        $scope.selectData(5);
    }
    $scope.changetime3=function(){

        $scope.selectData(3);
    }

    $scope.selectData = function (data) {
        console.log("$scope.account.time", $scope.account.time);
        console.log("$scope.account", $scope.account);
        $scope.time=data;
        $scope.sourceaccout = $scope.account;
        if ($scope.sourceaccout.type == 1) {
            $scope.viewweibo = false;
            $scope.viewweixin = true;
        } else {
            $scope.viewweibo = true;
            $scope.viewweixin = false;

        }
        console.log("  $scope.sourceaccout", $scope.sourceaccout);
        $http({
            method: 'POST',
            url: 'data/getStatistics',
            data: {
                type: $scope.sourceaccout.type,
                list: $scope.sourceaccout.list,
                time: $scope.time,
                fromtime: $scope.sourceaccout.frometime,
                totime: $scope.sourceaccout.totime
            },
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
            if (response.data.status == 0) {
                $scope.wbaccountList = response.data.object;

                console.log(" 111 ",$scope.wbaccountList.length);
                if($scope.wbaccountList.length<1){
                    console.log(" 111 ");
                   /* gpPrompt.ok({text: '没有数据'})*/
                }

                console.log("   $scope.wbaccountList", $scope.wbaccountList);
            } else {
                gpPrompt.ok({text: '正在抓取数据'})
            }
        });

    }

    $scope.$on('$viewContentLoaded', function (event, data) {
      $scope.selectData();
     // $scope.getarticle();
        /* $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;*/
    });
})
