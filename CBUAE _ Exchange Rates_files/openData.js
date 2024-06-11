app.controller('OpenDataController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.openDataList = [];
    $scope.showMore = false;
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.isLoading = false;
    $scope.skip = 0;
    $scope.take = 99999;
    $scope.Categories = [];
    $scope.startDate;
    $scope.endDate;
    $scope.search = "";
    $scope.orderBy = "";
    $scope.contactFormTitle = "";
    $scope.reverse = true;
    $scope.sortBy = function (sortType) {
        var propertyName = "UpdateDate";
        switch (sortType) {
            case '1':
                propertyName = "Date";
                $scope.reverse = false;
                break;
            case '2':
                propertyName = "Date";
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
        $scope.GetOpenDataList(true);
    }
    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.GetOpenDataList(true);
    }
    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.GetOpenDataList(true);
    }
    $scope.copyToClipboard = function (txt, name, copyToClipboardTxt) {
        window.showNotifications(txt, name, copyToClipboardTxt);
    };

    $scope.init = function (lan, pageId, search) {
        $scope.language = lan;
        $scope.currentPageId = pageId;
        if (search) {
            $scope.search = search;

        }
        $scope.GetOpenDataList(false);

    };
    $scope.searchData = function (search) {
        if (search) {
            if (!Comman.validationtext(search)) {
                $scope.searchValidationMsg = true;
            }
            else {
                if (search.length > 2) {
                    $scope.searchValidationMsg = false;
                    $scope.GetOpenDataList(true);
                }
                else {
                    if (search.length === 0) {
                        $scope.GetOpenDataList(true);
                    }
                    $scope.searchValidationMsg = true;
                }
            }
        }
    };
    $scope.loadMore = function () {
        $scope.take = $scope.take + 4;
        $scope.GetOpenDataList(true);
    };
    $scope.dateFilter = function (startDate, endDate) {
        $scope.validationMsg = false;
        $scope.GetOpenDataList(true);
        //if (new Date(startDate) < new Date(endDate)) {
        //    $scope.GetOpenDataList(true);
        //}
        //else {
        //    $scope.validationMsg = true;
        //}
    };

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

    $scope.GetOpenDataList = function (isFilter) {
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
        $scope.openDataList = [];
        $http.get(Comman.GetOpenData() + "?skip=" + $scope.skip + "&take=" + $scope.take + "&language=" + $scope.language + "&filterBy=" + $scope.selectedCategorie.join(",") + "&currentPageId="+$scope.currentPageId + "&startDate=" + $scope.startDate + "&endDate=" + $scope.endDate + "&search=" + $scope.search)
                .then(function (response) {
                    if (response.status === 200 && response.data.StatusCode === 200) {

                        $scope.openDataList = response.data.Data;
                        if (!isFilter) {
                            $scope.Categories = $scope.openDataList.Categories;
                        }
                    }
                }).finally(function () {
                    $scope.hideLoader();
                });
    }


    $scope.createBulkDownload = function () {
        $scope.showLoader();
        $scope.selectedFiles = [];
        $scope.allFiles = [];
        $scope.openDataList.OpenDataList.map(function (openData) {
            openData.Media.map(function (media) {
                if (openData.Selected) {
                    $scope.selectedFiles.push(media);
                }
                $scope.allFiles.push(media);
            });
        });

        $scope.validationMsg = false;
        var data = {
            CurrentPageId: $scope.currentPageId,
            Media: $scope.allFiles
        }
        if ($scope.selectedFiles.length > 0) {
            data.Media = $scope.selectedFiles;
        }


        $http.post(Comman.CreateZIP(), data)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    downloadURI(response.data.Data, "\\Download\\" + response.data.Data)
                }
            }).finally(function () {
                $scope.hideLoader();
            });


        function downloadURI(filename, dataUrl) {
            var link = document.createElement("a");
            link.download = filename;
            link.target = "_blank";

            // Construct the URI
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();

            // Cleanup the DOM
            document.body.removeChild(link);
            delete link;
        }

        //$scope.convertToArabic = function (date) {
        //    var en_date = new Date(date);
        //    var options = {localeMatcher:'lookup',  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //   return en_date.toLocaleDateString('ar-AE',options);
        //}



    }

});
