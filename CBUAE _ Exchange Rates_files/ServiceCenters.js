app.controller('ServiceCentersController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.serviceCenterList = [];
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.isLoading = false;
    $scope.currentPage = 1;
    $scope.pageSize = 8;
    $scope.Categories = [];
    $scope.search = "";
    $scope.orderBy = "";
    $scope.contactFormTitle = "";
    $scope.selectedCenter = {};

    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }

    $scope.init = function (lan) {
        $scope.language = lan;
        $scope.GetserviceCenters(false);

    }

    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.GetserviceCenters(true);
    }

    $scope.GetserviceCenters = function (isFilter) {
        $scope.showLoader();

        $scope.selectedCategorie = [];
        if ($scope.Categories) {
            $scope.Categories.map(function (categorie) {
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(categorie.ContentId);
                }
            });
        }

        $http.get(Comman.GetServiceCenters() + "?language=" + $scope.language + "&filterBy=" + $scope.selectedCategorie.join(",") )
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.serviceCentersList = [];
                    $scope.serviceCentersList = response.data.Data;
                    $scope.selectedCenter = $scope.serviceCentersList.ServiceCenters[0];
                    if (!isFilter) {
                        $scope.Categories = $scope.serviceCentersList.Categories;
                    }
                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

    $scope.initMap = function (_lat,_long) {
        const myLatLng = { lat: _lat, lng: _long};

        const map = new google.maps.Map(
            document.getElementById("map"),
            {
                zoom: 4,
                center: myLatLng,
            }
        );

        const marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
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
        window.showNotifications(txt, name, copyToClipboardTxt);
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

