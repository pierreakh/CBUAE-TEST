app.controller('AllFaqsController', function ($scope, $http, $timeout, Comman, $location,$sce) {
    $scope.allList = [];
    $scope.showMore = false;
    $scope.language = "en";
    $scope.currentPage = 1;
    $scope.pageSize = 4;

    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }

    $scope.init = function (lan) {
        $scope.language = lan;
        $scope.GetAllFaqs();
    }
    $scope.clearFilter = function () {
        $scope.allList.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.FaqList = $scope.allList.FaqList;
    }

    $scope.categoryFilter = function () {
        $scope.FaqList = [];
        $scope.allList.FaqList.map(function (faq) {

            $scope.allList.Categories.map(function (cat) {

                if (faq.Id===cat.Id && cat.Selected === true) {
                    $scope.FaqList.push(faq);
                }
            });
        });
        if ($scope.FaqList.length === 0) {
            $scope.FaqList = $scope.allList.FaqList;
        }
    }

    $scope.GetAllFaqs = function () {
        $scope.showLoader();
        $http.get(Comman.GetAllFaqData() + "?language=" + $scope.language)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.allList = [];
                    $scope.allList = response.data.Data;
                    $scope.FaqList = response.data.Data.FaqList;
                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

    $scope.htmlBind = function (text) {

        return $sce.trustAsHtml(text);
    };

});