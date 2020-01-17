angular.module('MetronicApp').controller('websiteBuilding1Controller', function ($rootScope, $state, $scope, settings, $http, gpPrompt, pageUtil) {
$scope.viewMeDium=true;
$scope.viewMyConcern=false; $scope.divopen=false;

    $scope.findMedium=function(){
        $scope.viewMeDium=true;
        $scope.viewMyConcern=false;
        $scope.divopen=false;
    }

    $scope.myConcern=function(){
        $scope.viewMeDium=false;
        $scope.viewMyConcern=true;
        $scope.divopen=false;
    }
    $scope.addtemplate=function(){

    }

    $scope.aasearch=function(){
        $scope.divopen=true;
    }
    $scope.$on('$viewContentLoaded', function (event, data) {

     // $scope.getarticle();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });
})
