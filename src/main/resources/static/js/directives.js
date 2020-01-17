/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope', '$state',
    function($rootScope, $state) {
        return {
            link: function(scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function() {
                    element.removeClass('hide'); // show spinner bar
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function(event) {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setAngularJsSidebarMenuActiveLink('match', null, event.currentScope.$state); // activate selected link in the sidebar menu
                   
                    // auto scorll to page top
                    setTimeout(function () {
                        App.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);     
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function() {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function() {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])
// Handle global LINK click
MetronicApp.directive('a', function() {
    return {
        restrict: 'E',
        link: function(scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function(e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});
// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
  return {
    link: function (scope, elem) {
      elem.dropdownHover();
    }
  };  
});
//分页条指令
MetronicApp.directive('gpowerPage', function () {
    return {
        restrict: 'EA',
        templateUrl:'tpl/pagination.html',
        replace: true,
        scope: {
            conf: '='
        },
        link: function (scope, element, attrs) {
            scope.conf.jumpPage = 1;
        	scope.GpowerFristPage = function(){
        		scope.conf.currentPage = 1;
        		scope.conf.jumpPage = scope.conf.currentPage;
        	};
        	scope.GpowerPrevPage = function(){
        		scope.conf.currentPage =  scope.conf.currentPage - 1;
                if (scope.conf.currentPage === 0) {
                    scope.conf.currentPage = 1;
                }
        		scope.conf.jumpPage = scope.conf.currentPage;
        	};
        	scope.GpowerDoCurrPage = function(pageNum){
        		scope.conf.currentPage = pageNum;
        		scope.conf.jumpPage = scope.conf.currentPage;
        	};
        	scope.GpowerNextPage = function(){
                scope.conf.currentPage =  scope.conf.currentPage +1;
                if (scope.conf.currentPage >= scope.conf.totalPage) {
                    scope.conf.currentPage = scope.conf.totalPage;
                }
        		scope.conf.jumpPage = scope.conf.currentPage;
        	};
        	scope.GpowerLastPage = function(){
        		scope.conf.currentPage =  scope.conf.totalPage;
        	};
        	scope.GpowerJumpPage = function(){
        		if(scope.conf.jumpPage<=scope.conf.totalPage && scope.conf.jumpPage>0){
        			scope.conf.currentPage =  scope.conf.jumpPage;
        		}
        		
        	};

        }
    };
});




MetronicApp.directive('myUeditor', function ($timeout) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            if (!ctrl) return;
            $timeout(function () {
                var ue = UE.getEditor(attrs.id);
                if (ue.iframe !== undefined) {
                    ue.destroy();
                }
                var ue = UE.getEditor(attrs.id);
                ue.ready(function () {
                    ue.addListener('contentChange', function () {
                        ctrl.$setViewValue(ue.getContent());
                        if (!scope.$$phase) {
                            scope.$apply();
                        }
                    });
                });
            });
        }
    }
});

MetronicApp.directive('makeSwitchConfirm', function ($timeout) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            if (!ctrl) return;
            $timeout(function () {
                element.bootstrapSwitch({
                    onSwitchChange: function (event, data) {
                        if (!data) {
                           /* if (confirm('用户将不能登陆系统，是否继续？')) {
                                scope.$apply(function () {
                                    ctrl.$setViewValue(data);
                                });
                            } else {
                                element.bootstrapSwitch('state', !data, true);
                            }*/
                        } else {
                            scope.$apply(function () {
                                ctrl.$setViewValue(data);
                            });
                        }
                    }
                });
            });
        }
    }
});

MetronicApp.directive('makeSwitch', function ($timeout) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, element, attrs, ctrl) {
            if (!ctrl) return;
            $timeout(function () {
                element.bootstrapSwitch({
                    onColor:"success",
                    offColor:"danger",
                    onSwitchChange: function (event, data) {
                        if (!data) {
                            scope.$apply(function () {
                                ctrl.$setViewValue(data);
                            });
                            /* if (confirm('禁用将撤销个人主页，是否继续？')) {
                                 scope.$apply(function () {
                                     ctrl.$setViewValue(data);
                                 });
                             } else {
                                 element.bootstrapSwitch('state', !data, true);
                             }*/
                        } else {
                            scope.$apply(function () {
                                ctrl.$setViewValue(data);
                            });
                        }
                    }
                });
            });
        }
    }
});
// 日期输入指令
MetronicApp.directive('datePicker', function ($timeout) {
    return {
        restrict: 'EA',
        // link函数可以用来创建操作DOM的指令
        link: function (scope, element, attrs) {
            $timeout(function () {
                var format = $(element)[0].dataset.format;
                var minView = 2;
                if (format && (format.indexOf('h') == -1 || format.indexOf('H') == -1)) {
                    minView = 0;
                }
                var endDate = $(element)[0].dataset.enddatedom;
                var startDate = $(element)[0].dataset.startdatedom;
                $(element).datetimepicker({
                    language: 'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',
                    forceParse: false,
                    showMeridian: true,
                    autoclose: true,
                    language: "zh-CN",
                    zIndex: 10000000000,
                    todayBtn: true
                }).on('changeDate', function (ev) {
                    var date = new Date(ev.date.valueOf());
                    if (endDate) {
                        date = date.setDate(date.getDate() + 1);
                        date = new Date(date);
                        $("#" + endDate).datetimepicker('setStartDate', date);
                    }
                    if (startDate) {
                        date = date.setDate(date.getDate() - 1);
                        date = new Date(date);
                        $("#" + startDate).datetimepicker('setEndDate', date);
                    }
                }).on('hide', function (ev) {
                }).on('show', function (ev) {
                });
            });


        }
    };
});

/*
//输入框校验指令
MetronicApp.directive('errorMessage', ['$compile', function($compile) {
    return {
        restrict: 'A',
        scope:{
            title:'@'
        },
        require: 'ngModel',
        link: function(scope, element, attr, ngModel) {

            var parenNode = element.parent();
            parenNode.addClass("has-feedback");


            var subScope = scope.$new(true);
            subScope.errorsText={
                required:"此项为必填",
                pattern:scope.title
            }

            subScope.hasError=function(){
                var re=(ngModel.$$parentForm.$submitted||ngModel.$dirty)&&ngModel.$invalid;
                if(re){
                    parenNode.addClass("has-error");
                }else{
                    parenNode.removeClass("has-error");
                }
                return re;
            }

            subScope.errors=function(){
                return ngModel.$error;
            }


            var errorElement = $compile(`
                <span ng-if="hasError()"  class="glyphicon glyphicon-warning-sign form-control-feedback" style="margin-top:2px;"></span>
                <ul class="help-block" ng-if="hasError()">
                    <li ng-repeat="(error,wrong) in errors()" ng-bind="errorsText[error]">
                </ul>
                `)(subScope);

            element.after(errorElement)
        }
    };
}]);
*/
