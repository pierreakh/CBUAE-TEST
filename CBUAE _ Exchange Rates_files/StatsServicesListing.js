app.controller('StatsServicesListingController', function ($scope, $http, $timeout, Comman, $location) {

    $scope.statsServicesListing = [];
    $scope.ContentId = 0;
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.isLoading = false;
    $scope.currentPage = 1;
    $scope.pageSize = 9;
    $scope.Categories = [];
    $scope.search = "";
    $scope.orderBy = "";
    $scope.contactFormTitle = "";
    $scope.reverse = true;
    $scope.startDate;
    $scope.endDate;
    $scope.sortBy = function (sortType) {
        var propertyName = "Date";
        switch (sortType) {
            case '1':
                $scope.reverse = false;
                break;
            case '2':
                $scope.reverse = true;
                break;
            default:
        }
        $scope.propertyName = propertyName;
    };
    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }
    $scope.commentFormTitle = function (txt) {
        //$("#doctexttitle").text(txt)
        console.log("document Title", txt)
        $('#c2f7b68a-3ed6-4a46-b269-8d63d798f1fe').val(txt);
        $('#doctexttitle1').text(txt);

        $('.commentFormThanks').hide()
        $('.commentFormContent').show()

    }

    $scope.clearDate = function () {
        $scope.startDate = null;
        $scope.endDate = null;
        $scope.GetstatsServicesListingPage(true);
    }
    $scope.dateFilter = function (startDate, endDate) {
        $scope.validationMsg = false;
        if (new Date(startDate) < new Date(endDate)) {
            $scope.GetstatsServicesListingPage(true);
        }
        else {
            $scope.validationMsg = true;
        }

    };

    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.GetstatsServicesListingPage(true);
    }
    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.GetstatsServicesListingPage(true);
    }

    $scope.init = function (lan, contentid) {
        $scope.ContentId = contentid;
        $scope.language = lan;
        /*$scope.currentPageId = pageId;*/
        //if (search) {
        //    $scope.search = search;
        //}
        $scope.GetstatsServicesListingPage(false);

    };
    $scope.commentFormTitle = function (txt) {
        //$("#doctexttitle").text(txt)
        console.log("document Title", txt)
        $('#c2f7b68a-3ed6-4a46-b269-8d63d798f1fe').val(txt);
        $('#doctexttitle1').text(txt);

        $('.commentFormThanks').hide()
        $('.commentFormContent').show()

    }
    $scope.searchData = function (search) {
        if (search) {
            if (!Comman.validationtext(search)) {
                $scope.searchValidationMsg = true;
            }
            else {
                if (search.length > 2) {
                    $scope.searchValidationMsg = false;
                    $scope.GetstatsServicesListingPage(true);
                }
                else {
                    if (search.length === 0) {
                        $scope.GetstatsServicesListingPage(true);
                    }
                    $scope.searchValidationMsg = true;
                }
            }
        }
        else {
            search = "";
            $scope.search = "";
            $scope.GetstatsServicesListingPage(true);
        }

    };


    $scope.GetstatsServicesListingPage = function (isFilter) {
        $scope.showLoader();
        $scope.selectedCategorie = [];
        if ($scope.Categories) {
            $scope.Categories.map(function (categorie) {
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(categorie.ContentId);
                }
            });
        }
        $scope.validationMsg = false;
        $scope.statsServicesListing = [];
        $http.get(Comman.GetStatsServiceListing() + "?&language=" + $scope.language + "&ContentId=" + $scope.ContentId  +"&filterBy=" + $scope.selectedCategorie.join(",")  + "&search=" + $scope.search)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.statsServicesListing = response.data.Data;
                    if (!isFilter) {
                        $scope.Categories = $scope.statsServicesListing.Categories;
                    }
                }
            }).finally(function () {
                $scope.hideLoader();
            });
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
