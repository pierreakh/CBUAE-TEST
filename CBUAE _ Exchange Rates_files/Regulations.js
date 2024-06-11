app.controller('RegulationsController', function ($scope, $http, $timeout, Comman, $location) {

    $scope.regulationsList = [];
    $scope.validationMsg = false;
    $scope.searchValidationMsg = false;
    $scope.isLoading = false;
    $scope.currentPage = 1;
    $scope.pageSize = 9;
    $scope.Categories = [];
    $scope.CategoriesLevel1 = [];
    $scope.CategoriesLevel2 = [];
    $scope.CategoriesLevel3 = [];
    $scope.CategoriesLevel = [];
    $scope.CategoriesLevelA = [];
    $scope.search = "";
    $scope.orderBy = "";
    $scope.contactFormTitle = "";
    $scope.reverse = true;
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

    $scope.clearSearch = function () {
        $scope.search = "";
        $scope.GetRegulationsList(true);
    }
    $scope.clearFilter = function () {
        $scope.Categories.map(function (categorie) {
            categorie.Selected = false;
        });
        $scope.CategoriesLevel1.map(function (categorylevel1) {
            categorylevel1.Selected = false;
        });
        $scope.CategoriesLevel2.map(function (categorylevel2) {
            categorylevel2.Selected = false;
        });
        $scope.CategoriesLevel3.map(function (categorylevel3) {
            categorylevel3.Selected = false;
        });
        $scope.GetRegulationsList(true);
    }

    $scope.init = function (lan, search) {
        $scope.language = lan;
        $scope.sortBy(2);
        /*$scope.currentPageId = pageId;*/
        if (search) {
            $scope.search = search;
        }
        $scope.GetRegulationsList(false);

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
                    $scope.GetRegulationsList(true);
                }
                else {
                    if (search.length === 0) {
                        $scope.GetRegulationsList(true);
                    }
                    $scope.searchValidationMsg = true;
                }
            }
        }
        else {
            search = "";
            $scope.search = "";
            $scope.GetRegulationsList(true);
        }

    };

    $scope.GetRegulationFilter = function (id) {
        $scope.showLoader();
        $scope.selectedCategorie = [];
        if ($scope.Categories) {
            $scope.Categories.map(function (categorie) {
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(id);
                }
            });
        }

        $scope.validationMsg = false;
        $scope.regulationsList = [];
        $http.get(Comman.GetRegulationsData() + "?&language=" + $scope.language + "&filterBy=" + $scope.selectedCategorie.join(",") + "&search=" + $scope.search)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.regulationsList = response.data.Data;
                    if (!isFilter) {
                        $scope.Categories = $scope.regulationsList.Categories;
                        $scope.CategoriesLevel1 = $scope.regulationsList.CategoriesLevel1;
                        $scope.CategoriesLevel2 = $scope.regulationsList.CategoriesLevel2;
                        $scope.CategoriesLevel3 = $scope.regulationsList.CategoriesLevel3;
                    }


                }
            }).finally(function () {
                $scope.hideLoader();
            });
    }

    $scope.GetRegulationsList = function (isFilter) {
        $scope.showLoader();
        $scope.selectedCategorie = [];
        if ($scope.Categories) {
            $scope.Categories.map(function (categorie) {
                alert("categorie" + categorie);
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(categorie.ContentId);
                }
            });
            $scope.CategoriesLevel1.map(function (categorie) {
                if (categorie.Selected) {
                    $scope.selectedCategorie.push(categorie.ContentId);
                }
            });
            $scope.CategoriesLevel2.map(function (categorylevel2) {
                if (categorylevel2.Selected) {
                    $scope.selectedCategorie.push(categorylevel2.ContentId);
                }
            });
            $scope.CategoriesLevel3.map(function (categorylevel3) {         
                if (categorylevel3.Selected) {
                    $scope.selectedCategorie.push(categorylevel3.ContentId);
                }
            });
        }
        
        $scope.validationMsg = false;
        $scope.regulationsList = [];
        $http.get(Comman.GetRegulationsData() + "?&language=" + $scope.language + "&filterBy=" + $scope.selectedCategorie.join(",") + "&search=" + $scope.search)
            .then(function (response) {
                if (response.status === 200 && response.data.StatusCode === 200) {
                    $scope.regulationsList = response.data.Data;
                    if (!isFilter) {
                        $scope.Categories = $scope.regulationsList.Categories;
                        $scope.CategoriesLevel1 = $scope.regulationsList.CategoriesLevel1;
                        $scope.CategoriesLevel2 = $scope.regulationsList.CategoriesLevel2;
                        $scope.CategoriesLevel3 = $scope.regulationsList.CategoriesLevel3;
                    }


                }
            }).finally(function () {
                $scope.hideLoader();
            });
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
