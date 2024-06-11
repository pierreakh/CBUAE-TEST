app.controller('statsEmirateController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.currentPage = 1;
    $scope.pageSize = 10;
    $scope.fileList = [];
    $scope.init = function (list) {
        $scope.fileList = list;
    }

    $scope.pageChangeHandler = function (num) {
       /* console.log('page changed to ' + num);*/
    };
});
