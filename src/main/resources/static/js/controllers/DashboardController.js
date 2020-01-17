angular.module('MetronicApp').controller('DashboardController', function ($rootScope, $scope, $http, $timeout, $state,gpPrompt) {
    $scope.pageConf = {currentPage: 1, pageSize: 5};
    $scope.searchWelcomes = function () {
        $http({
            method: 'GET',
            url: 'tips/welcome/all?' + $.param($scope.pageConf),
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.welcomeList = response.data.object;
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {
            console.log(response);
        });
    };
    $scope.$on('$viewContentLoaded', function (event, data) {
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });
});