app.controller('KhadamatiServiceController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.khadamatiServiceList = [];
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.isLoading = false;
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.Categories = [];
    $scope.search = "";
    $scope.orderBy = "";
    $scope.contactFormTitle = "";

    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }

    $scope.init = function (lan) {
        $scope.language = lan;
        $scope.GetKhadamatiServices(false);

    }
    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.GetKhadamatiServices(true);
    }
    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.GetKhadamatiServices(true);
    }

    $scope.clearServiceTypeFilter = function () {
        $scope.ServiceTypes.map(function (serviceType) {
            serviceType.Selected = false;
        });
        $scope.GetKhadamatiServices(true);
    }

    $scope.clearClassificationFilter = function () {
        $scope.Classification.map(function (classfication) {
            classfication.Selected = false;
        });
        $scope.GetKhadamatiServices(true);
    }

    $scope.GetKhadamatiServices = function (isFilter) {
        $scope.showLoader();

        $scope.selectedCategorie = [];
        if ($scope.Categories) {
            $scope.Categories.map(function (categorie) {
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(categorie.ContentId);
                }
            });
        }
        $scope.selectedServiceType = [];
        if ($scope.ServiceTypes) {
            $scope.ServiceTypes.map(function (serviceType) {
                if (serviceType.Selected) {
                    $scope.selectedServiceType.push(serviceType.ContentStringId);
                }
            });
        }
        $scope.selectedClassification = [];
        if ($scope.Classification) {
            $scope.Classification.map(function (classification) {
                if (classification.Selected) {
                    $scope.selectedClassification.push(classification.ContentStringId);
                }
            });
        }

        $http.get(Comman.GetKhadamatiServices() + "?language=" + $scope.language + "&filterBy=" + $scope.selectedCategorie.join(",") + "&filterType=" + $scope.selectedServiceType.join(",") + "&filterClassification=" + $scope.selectedClassification.join(",") + "&search=" + $scope.search)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.KhadamatiServicesList = [];
                    $scope.KhadamatiServicesList = response.data.Data;
                    if (!isFilter) {
                        $scope.Categories = $scope.KhadamatiServicesList.Categories;
                        $scope.ServiceTypes = $scope.KhadamatiServicesList.ServiceTypes;
                        $scope.Classification = $scope.KhadamatiServicesList.Classification;
                    }
                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

    $scope.searchData = function (search) {
        if (search) {
            if (!Comman.validationtext(search)) {
                $scope.searchValidationMsg = true;
            }
            else {
                if (search.length > 2) {
                    $scope.searchValidationMsg = false;
                    $scope.GetKhadamatiServices(true);
                }
                else {
                    if (search.length === 0) {
                        $scope.GetKhadamatiServices(true);
                    }
                    $scope.searchValidationMsg = true;
                }
            }
        }
        else {
            search = "";
            $scope.search = "";
            $scope.GetKhadamatiServices(true);
        }

    };


    $scope.commentFormTitle = function (txt) {
        //$("#doctexttitle").text(txt)
        console.log("document Title", txt)
        $('#c2f7b68a-3ed6-4a46-b269-8d63d798f1fe').val(txt);
        $('#doctexttitle1').text(txt);

        $('.commentFormThanks').hide()
        $('.commentFormContent').show()

    }
    $scope.copyToClipboard = function (txt, name, copyToClipboardTxt, isSamePage) {
        window.showNotifications(txt, name, copyToClipboardTxt, isSamePage);
    };


    $scope.submitcontnetrating = function (contentid, contentname, url, stars, culture, ipAddress, isSubmitted) {
        window.submitcontnetrating(contentid, contentname, url, stars, culture, ipAddress, isSubmitted);
    }

    $scope.submitcontnetlike_dislike = function (contentid, contentname, url, islike, culture, ipAddress, isSubmitted) {
        window.submitcontnetlike_dislike(contentid, contentname, url, islike, culture, ipAddress, isSubmitted);
    }
});


app.directive('happinessmeter', [function () {
    return {
        scope: {
            indexvalue: '@',
            language: '@',
            sequenceCode: '@',
            sequenceID: '@',
            serviceSequenceID: '@',
            serviceName: '@',
            originUrl: '@',

        },
        link: function ($scope, iElm, iAttrs, controller) {
            var script = '<script>' +
                '$(document).ready(function () {' +

                '$("#happiness-meter-widget-button-' + $scope.indexvalue + '").click(function () {' +
                'window.happinessMeterWidgetServices({' +
                '"language": "' + $scope.language + '",' +
                '"fullSequenceCode": "' + $scope.sequenceCode + '",' +
                '"entitySequenceID": "' + $scope.sequenceID + '",' +
                '"mainServiceSequenceID": "' + $scope.serviceSequenceID + '",' +
                '"subserviceSequenceID": "000", ' +
                '"subserviceComplementaryID": "000", ' +
                '"serviceNameEn": "' + $scope.serviceName + '",' +
                '"serviceNameAr": "' + $scope.serviceName + '",' +
                '"originUrl": "' + $scope.originUrl + '",' +
                '"customerId": "1", ' +
                '"email": "aaa@loyaltio.com", ' +
                '"phone": "+971000", ' +
                '"transactionId": "aaa000", ' +
                '"emiratesId": "00000aaaaaaa0000"' +
                ' })' +
                '  });' +
                '       });' +
                '</script>';

            var scriptElem = angular.element(script)
            iElm.append(scriptElem)
            scriptElem.on('ready')

        }
    };
}]);