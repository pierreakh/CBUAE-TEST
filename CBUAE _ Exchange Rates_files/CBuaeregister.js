app.controller('CBuaeregisterController', function ($scope, $http, $timeout, Comman, $location) {

    $scope.isLoading = false;
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.registerListing = [];
    $scope.institutionName = "";
    $scope.liceseType = "";
    $scope.headOffice = "";
    $scope.init = function (lan, pageId) {
        $scope.language = lan;
        $scope.currentPageId = pageId;

        $scope.GetRegisterListingItems(false);

    };
    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }
    $scope.GetRegisterListingItems = function () {

        $scope.showLoader();

        if (!$scope.institutionName) {
            $scope.institutionName = "";
        }
        if (!$scope.liceseType) {
            $scope.liceseType = "";
        }
        if (!$scope.headOffice) {
            $scope.headOffice = "";
        }
        $scope.validationMsg = false;
        $scope.registerListing = [];
        $http.get(Comman.AllRegisterItems() + "?&language=" + $scope.language + "&ContentId=" + $scope.currentPageId + "&institutionName=" + $scope.institutionName + "&liceseType=" + $scope.liceseType + "&headOffice=" + $scope.headOffice )
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.registerListing = response.data.Data;

                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

});