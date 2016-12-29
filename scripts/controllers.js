angular.module("mainCtrl", [])

//侧边导航
.controller("sideNav", ["$scope", "$rootScope", function($scope, $rootScope) {
    $scope.navs = [
        { text: "今日一刻", link: "#/today", className: "icon-home" },
        { text: "往期内容", link: "#/older", className: "icon-file-empty" },
        { text: "热门作者", link: "#/author", className: "icon-pencil" },
        { text: "栏目浏览", link: "#/category", className: "icon-menu" },
        { text: "我的喜欢", link: "#/favourite", className: "icon-heart" },
        { text: "设置", link: "#/settings", className: "icon-cog" }
    ];

    //点击nav收起侧边栏
    $rootScope.change = function(key) {
        $rootScope.collapsed = false;
        var items = document.querySelectorAll(".navs dd");
        var len = items.length - 1;
        for (var j = len; j >= 0; j--) {
            var item = items[j];
            item.style.transitionDuration = (len - j + 1) * 0.25 + "s";
            item.style.transitionDelay = "0s";
            item.style.transform = "translateX(-100%)";
        }
    }
}])

//今日内容
.controller("todayCtrl", ["$scope", "$http", "$filter", "$rootScope", function($scope, $http, $filter, $rootScope) {
    $rootScope.title = "今日内容";
    $rootScope.loaded = false;
    $rootScope.current = 0;

    var date = new Date();
    date = $filter("date")(date, "yyyy-MM-dd");

    $http({
        url: "api/today.php",
        params: {
            date: date
        }
    }).success(function(data) {
        $scope.posts = data.posts;
        $scope.date = data.date;
        $rootScope.loaded = true;
    })
}])


//往期内容
.controller("olderCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootscope) {
    $rootscope.loaded = false;
    $rootscope.title = "往期内容";
    $rootscope.current = 1;
    $scope.date = -1;

    var falg = true;
    $scope.posts = [];

    //获取数据的函数
    function getData(date) {
        if (falg) {
            $rootscope.olderLoad = true;
            if (!$rootscope.loaded) {
                $rootscope.olderLoad = false;
            }

            falg = false;
            $http({
                url: "api/older.php",
                params: {
                    date: date
                }
            }).success(function(data) {
            	console.log(data)
                $scope.posts = $scope.posts.concat(data.result.posts);
                $scope.date = data.date;
                $scope.day = data.result.date;
                $rootscope.loaded = true;
                $rootscope.loadingFooter = true;
                falg = true;
            })
        }
    }

    getData($scope.date);

    //滚动监听事件
    window.addEventListener("scroll", function() {
        var space = 200;
        //下面这句主要是获取网页的总高度，主要是考虑兼容性所以把Ie支持的documentElement也写了，这个方法至少支持IE8
        var htmlHeight = document.body.offsetHeight || document.documentElement.scrollHeight;
        //clientHeight是网页在浏览器中的可视高度，
        var clientHeight = document.documentElement.clientHeight;
        //scrollTop是浏览器滚动条的top位置，
        var scrollTop = document.body.scrollTop;
        //通过判断滚动条的top位置与可视网页之和与整个网页的高度是否相等来决定是否加载内容；
        if (scrollTop + clientHeight + space > htmlHeight) {
            getData($scope.date);
        }
    })
}])

//作者介绍
.controller("authorCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    $rootScope.title = "作者介绍";
    $rootScope.loaded = false;
    $rootScope.current = 2;
    $http({
        url: "api/author.php"
    }).success(function(data) {
        $scope.recs = data.rec.authors;
        $scope.hots = data.hot.authors;
        $rootScope.loaded = true;
    })
}])

//栏目浏览
.controller("categoryCtrl", ["$scope", "$http", "$rootScope", function($scope, $http, $rootScope) {
    $rootScope.title = "栏目浏览";
    $rootScope.loaded = false;
    $rootScope.current = 3;
    $http({
        url: "api/category.php"
    }).success(function(data) {
        $scope.columns = data.columns;
        $rootScope.loaded = true;
    })
}])
