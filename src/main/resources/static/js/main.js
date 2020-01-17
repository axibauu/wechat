/***
 Metronic AngularJS App Main Script
 ***/
/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngFileUpload"
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
}]);

MetronicApp.config(['$controllerProvider', function ($controllerProvider) {
    $controllerProvider.allowGlobals();
}]);

MetronicApp.factory('settings', ['$rootScope', function ($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageFullWidthClosed:false,
            pageAutoScrollOnLoad: 100000000 // auto scroll to top on page load
        },
        assetsPath: 'assets',
        globalPath: 'assets/global',
        layoutPath: 'assets/layouts/layout',
    };
    $rootScope.settings = settings;
    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', '$http', 'gpPrompt', '$state', function ($scope, $rootScope, $http, gpPrompt, $state) {

    $scope.setLanguges = function (lang) {
        $http({
            method: 'GET',
            url: 'languages/' + lang
        }).then(function (response) {
            if (response.data.status === 0) {
                gpPrompt.ok({text: response.data.msg});
                window.location.reload(true);
            } else {
                gpPrompt.error({text: response.data.msg});
            }
        });
    };

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

    $scope.$on('$viewContentLoaded', function () {
        $scope.getLoginUser();
    });
}]);

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function ($scope) {
     $scope.$on('$includeContentLoaded', function() {
         Layout.initHeader(); // init header
     });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$state', '$scope', function ($state, $scope) {
    $scope.$on('$includeContentLoaded', function () {
        Layout.initSidebar($state); // init sidebar
    });
}]);

/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);