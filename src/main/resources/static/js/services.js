/***
GLobal Services
***/

MetronicApp.service('gpPrompt', ['$rootScope', function ($rootScope) {
    const gpPrompt = {
        error: function (params) {
            $.bootstrapGrowl(params.text, {
                ele: 'body',
                type: 'danger',
                offset: {
                    from: 'top',
                    amount: 20
                },
                align: 'center',
                width: 'auto',
                delay: 3000,
                allow_dismiss: true,
                stackup_spacing: 10
            });
        },
        ok: function (params) {
            $.bootstrapGrowl(params.text, {
                ele: 'body',
                type: 'success', // (null, 'info', 'danger', 'success', 'warning')
                offset: {
                    from: 'top',
                    amount: 20
                }, // 'top', or 'bottom'
                align: 'center', // ('left', 'right', or 'center')
                width: 'auto', // (integer, or 'auto')
                delay: 3000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                allow_dismiss: true, // If true then will display a cross to close the popup.
                stackup_spacing: 10 // spacing between consecutively stacked growls.
            });
        },
        confirm:function (text,confirmFn) {
            swal({
                title: text,
                text: "",
                type: "",
                showCancelButton: true,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnConfirm: true
            }, function() {
                confirmFn();
            })
        }
    };
    $rootScope.gpPrompt = gpPrompt;
    return gpPrompt;
}]);

MetronicApp.service('pageUtil',function () {
    this.setResponsePageConf = function (pageConf, responsePage) {
        pageConf.currentPage = responsePage.currentPage;
        pageConf.totalPage = responsePage.totalPage;
        pageConf.pageSize = responsePage.pageSize;
        pageConf.totalCount = responsePage.totalCount;
        pageConf.showPages = this.pageNumInit(pageConf);
    };

    this.getQueryData = function (QueryCriteria, pageConf) {
        const data = $.param({
            currentPage: pageConf.currentPage,
            pageSize: pageConf.pageSize,
        });
        if (JSON.stringify(QueryCriteria) !== '{}') {
            const criteriaStr = $.param(QueryCriteria);
            return data + '&' + criteriaStr;
        }
        return data;
    };

    this.pageNumInit = function (page) {
        const showNum = 10;
        let arr = [];
        let startIndex = page.currentPage - 4; //(showNum - 1) / 2;
        let endIndex = page.currentPage + 4; //(showNum - 1) / 2;
        /*let startIndex = page.currentPage - (showNum - 1) / 2;
        let endIndex = page.currentPage + (showNum - 1) / 2;*/
        if (startIndex < 1) {
            startIndex = 1;
        }
        ;
        if (endIndex >= page.totalPage) {
            endIndex = page.totalPage;
        }
        ;
        for (let i = startIndex; i <= endIndex; i++) {
            arr.push(i);
        }
        ;
        return arr;
    };
});


MetronicApp.service('drafpageUtil',function () {
    this.setResponsePageConf = function (pageConf, responsePage) {
        pageConf.currentPage = responsePage.currentPage;
        pageConf.totalPage = responsePage.totalPage;
        pageConf.pageSize = responsePage.pageSize;
        pageConf.totalCount = responsePage.totalCount;
        pageConf.showPages = this.pageNumInit(pageConf);
    };

    this.getQueryData = function (QueryCriteria, pageConf) {
        const data = $.param({
            currentPage: pageConf.currentPage,
            pageSize: pageConf.pageSize,
        });
        if (JSON.stringify(QueryCriteria) !== '{}') {
            const criteriaStr = $.param(QueryCriteria);
            return data + '&' + criteriaStr;
        }
        return data;
    };

    this.pageNumInit = function (page) {
        const showNum = 10;
        let arr = [];
        let startIndex = page.currentPage - 4; //(showNum - 1) / 2;
        let endIndex = page.currentPage + 4; //(showNum - 1) / 2;
        /*let startIndex = page.currentPage - (showNum - 1) / 2;
        let endIndex = page.currentPage + (showNum - 1) / 2;*/
        if (startIndex < 1) {
            startIndex = 1;
        }
        ;
        if (endIndex >= page.totalPage) {
            endIndex = page.totalPage;
        }
        ;
        for (let i = startIndex; i <= endIndex; i++) {
            arr.push(i);
        }
        ;
        return arr;
    };
});

