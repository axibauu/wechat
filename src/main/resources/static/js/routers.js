/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "views/dashboard.html",
            data: {pageTitle: 'Admin Dashboard Template'},
            controller: "DashboardController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/DashboardController.js',
                        ]
                    });
                }]
            }
        })
        .state('userSetting', {
            url: "/usermanage",
            templateUrl: "views/user/userList.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "UserController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                        files: [
                            'js/controllers/UserController.js',
                            'assets/global/plugins/bootstrap-toastr/toastr.min.js'
                        ]
                    });
                }]
            }
        })
        .state('roleSetting', {
            url: "/rolemanager ",
            templateUrl: "views/role/roleList.html",
            data: {pageTitle: 'Advanced Datatables'},
            controller: "RoleController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/RoleController.js'
                        ]
                    });
                }]
            }
        })
        .state('groupSetting',{
            url: "/groupManagement",
            templateUrl: "views/group/group.html",
            controller: "GroupController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/GroupController.js',
                        ]
                    });
                }]
            }
        })
        .state('downLogSetting', {
            url: "/downlog",
            templateUrl: "views/log/logList.html",
            controller: "SystemLogController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/SystemLogController.js',
                        ]
                    });
                }]
            }
        })
        .state('uploadSetting', {
            url: "/fileUpload",
            templateUrl: "views/upload/uploadPage.html",
            controller: "FileUploadController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'assets/global/plugins/angularjs/plugins/ui-select/select.min.css',
                            'assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                            'assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',

                            'js/controllers/FileUploadController.js',
                        ]
                    });
                }]
            }
        })
        .state('personalCenterSetting', {
            url: "/personalCenter",
            templateUrl: "views/personal_center/personal_center.html",
            controller: "PersonalCenterController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/PersonalCenterController.js',
                        ]
                    });
                }]
            }
        })
        .state('weixinSetting',{
            url: "/weixinmanage",
            templateUrl: "views/weixin/weixin.html",
            controller: "WeixinCenterController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/WeixinCenterController.js',
                        ]
                    });
                }]
            }
        })
        .state('accountSetting',{
            url: "/accountManagement",
            templateUrl: "views/account/account.html",
            controller: "AccountController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/AccountController.js',
                        ]
                    });
                }]
            }
        })
        .state('wxPublishSetting',{
            url: "/wxPublishManagement",
            templateUrl: "views/weixin/wx.html",
            controller: "wxPublishController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxPublishController.js',
                        ]
                    });
                }]
            }

        })
        .state('wbPublishSetting',{
            url: "/wbPublishManagement",
            templateUrl: "views/weibo/wb.html",
            params: {data: null,cmd:null},
            controller: "wbPublishController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wbPublishController.js',
                        ]
                    });
                }]
            }

        })
        .state('websiteBuilding1',{
            url: "/websiteBuilding1",
            templateUrl: "views/webuild/web1.html",
            controller: "websiteBuilding1Controller",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/websiteBuilding1Controller.js',
                        ]
                    });
                }]
            }

        })
        .state('websiteBuilding',{
            url: "/websiteBuilding",
            templateUrl: "views/webuild/web1.html",
            controller: "websiteBuildingController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/websiteBuildingController.js',
                        ]
                    });
                }]
            }

        })
        .state('mediumConsultation',{
            url: "/mediumConsultation",
            templateUrl: "views/consultation/medium.html",
            controller: "mediumConsultationController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/mediumConsultationController.js',
                        ]
                    });
                }]
            }

        })
        .state('dataStatistics2',{
            url: "/dataStatisticsManagement2",
            templateUrl: "views/data/data2.html",
            controller: "dataStatistics2Controller",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/dataStatistics2Controller.js',
                        ]
                    });
                }]
            }

        })

        .state('dataStatistics',{
            url: "/dataStatisticsManagement",
            templateUrl: "views/data/data.html",
            controller: "dataStatisticsController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/dataStatisticsController.js',
                        ]
                    });
                }]
            }

        })
        .state('wxPublishArticleImg',{
            url: "/wxPublishManagement",
            templateUrl: "views/weixin/wxPublish.html",
            params: {data: null,cmd:null},
            controller: "wxPublisharticleController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxPublisharticleController.js',
                        ]
                    });
                }]
            }

        })
        .state('wxPublishArticle',{
            url: "/wxPublishTextManagement",
            templateUrl: "views/weixin/wxPublishtext.html",
            params: {data: null,cmd:null},
            controller: "wxPublishtextController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxPublishtextController.js',
                        ]
                    });
                }]
            }


        })
        .state('wxPublishImg',{

            url: "/wxPublishImageManagement",
            templateUrl: "views/weixin/wxPublishImage.html",
            params: {data: null,cmd:null},
            controller: "wxPublishImageController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxPublishImageController.js',
                        ]
                    });
                }]
            }

        })
        .state("userGroupSetting",{
            url: "/userGroupManagement",
            templateUrl: "views/user/userGroup.html",
            controller: "userGroupController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/userGroupController.js',
                        ]
                    });
                }]
            }
        })
        .state("wbeditorsetting",{
            url: "/wbeditormanager",
            params: {data: null},
            templateUrl: "views/weibo/wbeditor.html",
            controller: "wbeditorController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wbeditorController.js',
                        ]
                    });
                }]
            }
        })

        .state("audittext",{
            url: "/auditwxtext",
            params: {data: null,cmd:null},
            templateUrl: "views/audit/audittext.html",
            controller: "wxaudittextController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxaudittextController.js',
                        ]
                    });
                }]
            }
        })



        .state("auditnew",{
            url: "/auditwxnew",
            params: {data: null,cmd:null},
            templateUrl: "views/audit/wxnewsaudit.html",
            controller: "wxauditnewsController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxauditnewsController.js',
                        ]
                    });
                }]
            }
        })

        .state("wbaudit",{
            url: "/wbaudit",
            params: {data: null,cmd:null},
            templateUrl: "views/audit/wbaudit.html",
            controller: "wbauditController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wbauditController.js',
                        ]
                    });
                }]
            }
        })

        .state("auditimage",{
            url: "/auditimage",
            params: {data: null,cmd:null},
            templateUrl: "views/audit/auditimage.html",
            controller: "wxauditimagesController",
            resolve: {
                deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'MetronicApp',
                        insertBefore: '#ng_load_plugins_before',
                        files: [
                            'js/controllers/wxauditimagesController.js',
                        ]
                    });
                }]
            }
        })


}]);
