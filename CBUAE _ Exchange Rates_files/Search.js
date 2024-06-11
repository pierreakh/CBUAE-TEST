app.controller('SearchController', function ($scope, $http, $timeout, Comman, $location, $cookies, $sce) {
    $scope.searchList = [];
    $scope.lst = [];
    $scope.showMore = false;
    $scope.search = "";
    $scope.validationMsg = false;
    $scope.isLoading = false;
    $scope.bookmarkList = [];
    $scope.searchCookieList = [];
    $scope.searchbyKeywords = true;
    $scope.currentPage =1;
    $scope.pageSize = 10;

    $scope.propertyName = 'name';
    $scope.reverse = true;





    $scope.sortBy = function (sortType) {
        var propertyName = "UpdateDate";
        switch (sortType) {
            case '1':
                $scope.reverse = true;
                break;
            case '2':
                $scope.reverse = false;
                break;
            case '3':
                propertyName = "Name";
                $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
                break;
            default:
        }

        $scope.propertyName = propertyName;

    };
    $scope.sortByName = function () {
        $scope.propertyName = "";
        var arabicArrray = $scope.searchList.SearchData;
        $scope.lst = arabicArrray.sort(function (a, b) {
            return a.Name.localeCompare(b.Name, ["ar"]);
        });

    }

    $scope.init = function (lan, searchString) {
        $scope.language = lan;
        $scope.search = searchString;
        $scope.GetCookie();
        $scope.GetSearchCookie();
        if (searchString) {
            $scope.searchbyKeywords = false;
            $scope.searchbySentence = true;
        }
        $scope.GetSearch(searchString, lan)
    };

    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }

    $scope.GetSearch = function (query, lan) {
        $scope.showLoader();
        $scope.validationtextMsg = Comman.validationtext(query);
        if (query && query !== "" && query.length > 2) {
            $scope.statsList = [];
            $scope.validationMsg = false;

            $http.get(Comman.GetSearch() + "?query=" + query + "&language=" + lan + "&searchBy=" + $scope.searchbyKeywords)
                .then(function (response) {
                    if (response.status === 200 && response.data.StatusCode === 200) {
                        $scope.currentPage = 1;
                        $scope.searchList = response.data.Data;
                        $scope.lst = response.data.Data.SearchData;
                        $scope.CategoryList = response.data.Data.CategoryList;
                        $scope.SetSearchCookie($scope.searchList.Total);
                        $scope.CategoryList.map(function (categorie) {
                            categorie.selected = false;
                        });
                    }
                }).finally(function () {
                    $scope.hideLoader();
                });
        }
        else {
            if (!query || query.length === 0) {
                $scope.clearFilterBy();
                $scope.clearFilterByType();
                $scope.lst = [];
                $scope.searchList = [];

            }
            $scope.hideLoader();
            $scope.validationMsg = true;
        }
    }

    $scope.filterFn = function (elm) {
        if ($scope.CategoryList) {
            $scope.currentPage = 1;
            var isfilter = false;
            $scope.CategoryList.map(function (categorie) {
                if (categorie.selected) {
                    isfilter = true;
                }

            });
            if (isfilter) {
                $scope.lst = [];
                 $scope.searchList.SearchData.map(function (searchobj) {
                    $scope.CategoryList.map(function (categorie) {
                        if (categorie.selected && categorie.Id === searchobj.Category.Id) {
                            $scope.lst.push(searchobj)
                        }
                    });
                });
            }
            else {
                $scope.lst = $scope.searchList.SearchData;
            }
        }
        //if ($scope.CategoryList) {
        //    var isfilter = false;
        //   $scope.CategoryList.map(function (categorie) {
        //       if (categorie.selected) {
        //           isfilter = true;
        //        }

        //    });


        //    var currenSearch = false;
        //    if (isfilter) {
        //        $scope.CategoryList.map(function (categorie) {

        //            if (categorie.selected && categorie.Id === elm.Category.Id) {
        //                currenSearch = true;
        //            }
        //        });
        //    }
        //    else {
        //        return true;
        //    }
        //    return currenSearch;
        //}
        //else {
        //    return true;
        //}
    };

    $scope.GetSuggestedSearch = function (query, lan) {
        $scope.search = query;
        $scope.GetSearch(query, lan)
    }

    $scope.GetCookie = function () {
        $scope.bookmarkList = $cookies.getObject('bookMarkSearch-' + $scope.language);
        if (!$scope.bookmarkList)
            $scope.bookmarkList = [];
    }

    $scope.SetCookie = function (item, total) {
        if (!$scope.isBookMarked(item)) {
            item.Total = total;
            item.Search = $scope.search;
            $scope.bookmarkList.push(item);

            ////Remove first element if list has more than 3
            //if ($scope.bookmarkList.length > 3) {
            //    $scope.bookmarkList.splice(0, 1);
            //}
            // Setting a cookie
        }
        else {
            var found = $scope.bookmarkList.find(function (x) { return x.ContentId === item.ContentId });
            var index = $scope.bookmarkList.indexOf(found);
            $scope.bookmarkList.splice(index, 1);

        }
        $cookies.putObject('bookMarkSearch-' + $scope.language, $scope.bookmarkList, { 'path': "/" });
    }


    $scope.GetSearchCookie = function () {
        $scope.searchCookieList = $cookies.getObject('SearchCookie-' + $scope.language);
        if (!$scope.searchCookieList)
            $scope.searchCookieList = [];
    }

    $scope.SetSearchCookie = function (total) {
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
    }


    $scope.isBookMarked = function (item) {

        var found = $scope.bookmarkList.find(function (x) { return x.ContentId === item.ContentId });
        if (found) {
            return true;
        }
        else {
            return false;
        }

    }

    $scope.highlight = function (text, searchword) {
        if (!searchword) {
            return $sce.trustAsHtml(text);
        }
        return $sce.trustAsHtml(text.replace(new RegExp(searchword, 'gi'), '<span>$&</span>'));
    };


    $scope.clearFilterBy = function () {
        $scope.sortyByObj = "";
        $scope.sortBy("3");
    }
    $scope.clearFilterByType = function () {
        if ($scope.CategoryList) {
            $scope.CategoryList.map(function (categorie) {
                categorie.selected = false;

            });
            $scope.filterFn();
        }
    }

    $scope.changePage = function (page) {
        $scope.currentPage = page;
    }
});
app.filter('startFrom', function () {
    return function (input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});
