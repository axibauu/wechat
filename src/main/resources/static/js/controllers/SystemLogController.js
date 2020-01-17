angular.module('MetronicApp').controller('SystemLogController', function ($rootScope, $scope, $http, pageUtil, gpPrompt) {
    // 分页信息
    $scope.pageConf = {currentPage: 1, pageSize: 5};
    // 查询条件
    $scope.QueryCriteria = {};
    $scope.logList = {};

    $scope.searchLogList = function () {
        $http({
            method: 'POST',
            url: 'log/page',
            data: pageUtil.getQueryData($scope.QueryCriteria, $scope.pageConf),
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).then(function (response) {
            if (response.data.status === 0) {
                $scope.logList = response.data.page.list;
                pageUtil.setResponsePageConf($scope.pageConf, response.data.page);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        }, function (response) {

        });
    };

    $scope.$watch('pageConf.currentPage+pageConf.pageSize', $scope.searchLogList);

    $scope.$on('$viewContentLoaded', function (event, data) {
        $scope.searchLogList();
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
        $rootScope.settings.layout.containerBgSolid = false;
    });
});