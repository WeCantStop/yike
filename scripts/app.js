var yike = angular.module("yike", ["ngRoute", "mainCtrl"]);

yike.controller("yikeCtrl", ["$scope", "$rootScope", "$http", function($scope, $rootScope, $http) {

    $rootScope.collapsed = false;
    //点击菜单按钮事件
    $scope.slide = function() {
        $rootScope.collapsed = !$rootScope.collapsed;
        if ($scope.collapsed) {
            //展开侧边栏
            var items = document.querySelectorAll(".navs dd");
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                item.style.transitionDuration = (i + 1) * 0.1 + "s";
                item.style.transitionDelay = "0.25s";
                item.style.transform = "translateX(0)";
            }
        }
        //收起侧边栏
        else {
            var items = document.querySelectorAll(".navs dd");
            var len = items.length - 1;
            for (var j = len; j >= 0; j--) {
                var item = items[j];
                item.style.transitionDuration = (len - j + 1) * 0.25 + "s";
                item.style.transitionDelay = "0s";
                item.style.transform = "translateX(-100%)";
            }
        }
    }
}])

//配置路由
yike.config(["$routeProvider", function($routeProvider) {
    $routeProvider.when("/today", {
        templateUrl: "views/today.html",
        controller: "todayCtrl"
    }).when("/older", {
        templateUrl: "views/older.html",
        controller: "olderCtrl"
    }).when("/author", {
        templateUrl: "views/author.html",
        controller: "authorCtrl"
    }).when("/category", {
        templateUrl: "views/category.html",
        controller: "categoryCtrl"
    }).when("/favourite", {
        templateUrl: "views/favourite.html",
        controller: "favouriteCtrl"
    }).when("/settings", {
        templateUrl: "views/settings.html",
        controller: "settingsCtrl"
    }).otherwise({
        redirectTo: "/today"
    })
}])
