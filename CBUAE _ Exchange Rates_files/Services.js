app.controller('ServiceController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.onlineServiceList = [];
    $scope.OnlineServiceContentId = 0;
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

    $scope.init = function (lan, onlineServiceId,search) {
        $scope.OnlineServiceContentId = onlineServiceId;
        $scope.language = lan;
        if (search) {
            $scope.search = search;
        }
        $scope.GetOnlineServices(false);

    }
    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.GetOnlineServices(true);
    }
    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.GetOnlineServices(true);
    }

    $scope.clearServiceTypeFilter = function () {
        $scope.ServiceTypes.map(function (serviceType) {
            serviceType.Selected = false;
        });
        $scope.GetOnlineServices(true);
    }

    $scope.clearClassification = function () {
        $scope.Classfication.map(function (classfication) {
            classfication.Selected = false;
        });
        $scope.GetOnlineServices(true);
    }

    $scope.GetOnlineServices = function (isFilter) {
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
                    $scope.selectedServiceType.push(serviceType.ContentId);
                }
            });
        }

        $http.get(Comman.GetOnlineServices() + "?language=" + $scope.language + "&ContentId=" + $scope.OnlineServiceContentId + "&filterBy=" + $scope.selectedCategorie.join(",") + "&filterType=" + $scope.selectedServiceType.join(",") + "&search=" + $scope.search)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.onlineServiceList = [];
                    $scope.onlineServiceList = response.data.Data;
                    if (!isFilter) {
                        $scope.Categories = $scope.onlineServiceList.Categories;
                        $scope.ServiceTypes = $scope.onlineServiceList.ServiceTypes;
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
                    $scope.GetOnlineServices(true);
                }
                else {
                    if (search.length === 0) {
                        $scope.GetOnlineServices(true);
                    }
                    $scope.searchValidationMsg = true;
                }
            }
        }
        else {
            search = "";
            $scope.search = "";
            $scope.GetOnlineServices(true);
        }

    };


    $scope.GetServices = function () {
        $scope.showLoader();
        $http.get(Comman.GetServices())
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.serviceList = [];
                    $scope.serviceList = response.data.Data;
                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

    $scope.commentFormTitle = function (txt) {
        //$("#doctexttitle").text(txt)
        console.log("document Title", txt)
        $('#c2f7b68a-3ed6-4a46-b269-8d63d798f1fe').val(txt);
        $('#doctexttitle1').text(txt);

        $('.commentFormThanks').hide()
        $('.commentFormContent').show()

    }
    $scope.copyToClipboard = function (txt, name, copyToClipboardTxt) {
        window.showNotifications(txt, name, copyToClipboardTxt,true);
    };


    $scope.submitcontnetrating = function (contentid, contentname, url, stars, culture, ipAddress, isSubmitted) {
        window.submitcontnetrating(contentid, contentname, url, stars, culture, ipAddress, isSubmitted);
    }

    $scope.submitcontnetlike_dislike = function (contentid, contentname, url, islike, culture, ipAddress, isSubmitted) {
        window.submitcontnetlike_dislike(contentid, contentname, url, islike, culture, ipAddress, isSubmitted);
    }
    $scope.convertToArabic = function (date) {
        var en_date = new Date(date);
        var year = en_date.getFullYear();

        var month = (1 + en_date.getMonth()).toString();
        month = month.length > 1 ? month : '0' + month;

        var day = en_date.getDate().toString();
        day = day.length > 1 ? day : '0' + day;

        var arabicDay = en_date.toLocaleDateString('ar-AE', { localeMatcher: 'lookup', weekday: 'long' });
        var arabicMonth = en_date.toLocaleDateString('ar-AE', { localeMatcher: 'lookup', month: 'long' });

        var formateDate = day + " " + arabicMonth + " " + year;

        // var options = {localeMatcher:'lookup',  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        //return en_date.toLocaleDateString('ar-AE',options);
        return formateDate;
    }
});


app.directive('happinessmeters', [function () {
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

                '$("#happiness-meter-widget-online-button-' + $scope.indexvalue + '").click(function () {' +
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