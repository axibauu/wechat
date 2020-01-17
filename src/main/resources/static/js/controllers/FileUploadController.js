angular.module('MetronicApp').controller('FileUploadController', function ($rootScope, $scope, $http, $timeout, $state, Upload, gpPrompt) {
    $scope.uploadFile = {};

    $scope.uploadImgPath = '';

    $scope.submitBtn = function () {
        console.log($scope.uploadFile);
        Upload.upload({
            method: 'POST',
            url: 'storage',
            file: $scope.uploadFile,
            data : {
                name : 'userSpecifiedFileName'
            }
        }).then(function (response) {
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
                $scope.uploadImgPath = 'storage/' + response.data.msg;
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        });
    };

    $scope.$on('$viewContentLoaded', function (event, data) {
        $rootScope.settings.layout.pageContentWhite = false;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
});