app.controller('SearchHeaderController', function ($scope, $http, $timeout, Comman, $location, $cookies, $sce) {
    $scope.search = "";
    $scope.searchCookieList = [];
    $scope.searchbyKeywords = true;
    $scope.searchUrl = "";


    $scope.init = function (lan, url) {
        $scope.language = lan;
        $scope.GetSearchCookie();
        $scope.searchUrl = url;
    };
    $scope.GetSearchCookie = function () {
        $scope.searchCookieList = $cookies.getObject('SearchCookie-' + $scope.language);
        if (!$scope.searchCookieList)
            $scope.searchCookieList = [];
    }
    $scope.SetSearchCookie = function (total) {
        if ($scope.search.length > 2) {
            var item = {};
            item.Total = total;
            item.Search = $scope.search;
            var found = $scope.searchCookieList.find(function (x) { return x.Search === $scope.search });
            if (!found) {
                $scope.searchCookieList.push(item);

                //Remove first element if list has more than 3
                if ($scope.searchCookieList.length > 3) {
                    $scope.searchCookieList.splice(0, 1);
                }
                /*Setting a cookie*/
                $cookies.putObject('SearchCookie-' + $scope.language, $scope.searchCookieList, { 'path': "/" });
            }
            $scope.redirect($scope.search)
        }
    }
    $scope.redirect = function (search) {
        window.location.href = $scope.searchUrl + "?search=" + search
    }
});