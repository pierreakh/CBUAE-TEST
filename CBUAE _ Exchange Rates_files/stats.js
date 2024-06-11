app.controller('StatsController', function ($scope, $http, $timeout, Comman, $location) {
    $scope.serviceList = [];
    $scope.showMore = false;
    $scope.validationMsg = false;
    $scope.isLoading = false;
    $scope.chart1 = '<canvas id="piechart-1" width="506" height="300" style="display: block; box-sizing: border-box; height: 300px; width: 506px;"></canvas>';
    $scope.chart2 = '<canvas id="piechart-2" width="506" height="300" style="display: block; box-sizing: border-box; height: 300px; width: 506px;"></canvas>';
    $scope.chart3 = '<canvas id="piechart-3" width="1076" height="538" style="display: block; box-sizing: border-box; height: 538px; width: 1076px;"></canvas>';
    $scope.chart4 = '<canvas id="piechart-4" width="506" height="300" style="display: block; box-sizing: border-box; height: 300px; width: 506px;"></canvas>';
    $scope.chart5 = '<canvas id="piechart-5" width="506" height="253" style="display: block; box-sizing: border-box; height: 253px; width: 506px;"></canvas>';



    $scope.showLoader = function () {
        $scope.isLoading = true;
    }
    $scope.showChart = function () {
        $scope.showChart1 = true;
        $scope.showChart2 = true;
        $scope.showChart3 = true;
        $scope.showChart4 = true;
        $scope.showChart5 = true;
    }
    $scope.hideLoader = function () {
        $scope.isLoading = false;
    }
    $scope.init = function () {
        let To = new Date();
        let From = new Date();

        From.setMonth(To.getMonth() - 1);
        $scope.GetStats($.datepicker.formatDate('yy-mm-dd', From), $.datepicker.formatDate('yy-mm-dd', To));
    }
    $scope.GetStats = function (startDate, endDate) {
        $scope.showLoader();

        if (new Date(startDate) < new Date(endDate)) {
            $scope.statsList = [];
            $scope.validationMsg = false;
            $http.get(Comman.GetStats() + "?startDate=" + startDate + "&endDate=" + endDate)
                .then(function (response) {
                    if (response.status === 200 && response.data.StatusCode === 200) {
                        $scope.showChart();
                        $scope.statsList = response.data.Data;
                        $("#piechart-1").remove();
                        $('#chartcontainer-1').append($scope.chart1);
                        if ($scope.statsList.MostUsedOsViewModel.data != null) {
                            $scope.createChart($scope.statsList.MostUsedOsViewModel, 1);
                        }
                        else {
                            $scope.showChart1 = false;
                        }
                        $("#piechart-2").remove();
                        $('#chartcontainer-2').append($scope.chart2);
                        if ($scope.statsList.CountryStatisticsViewModel.data != null) {
                            $scope.createChart($scope.statsList.CountryStatisticsViewModel, 2);
                        }
                        else {
                            $scope.showChart2 = false;
                        }

                        $("#piechart-3").remove();
                        $('#chartcontainer-3').append($scope.chart3);
                        if ($scope.statsList.TopPagesViewModel.data != null) {
                            $scope.createBarChart($scope.statsList.TopPagesViewModel, 3);
                        }
                        else {
                            $scope.showChart3 = false;
                        }

                        $("#piechart-4").remove();
                        $('#chartcontainer-4').append($scope.chart4);
                        if ($scope.statsList.DevicesViewModel.data != null) {
                            $scope.createChart($scope.statsList.DevicesViewModel, 4);
                        }
                        else {
                            $scope.showChart4 = false;
                        }

                        $("#piechart-5").remove();
                        $('#chartcontainer-5').append($scope.chart5);
                        if ($scope.statsList.BrowsersViewModel.data != null) {
                            $scope.createBarChart($scope.statsList.BrowsersViewModel, 5);
                        }
                        else {
                            $scope.showChart5 = false;
                        }

                    }
                }).finally(function () {
                    $scope.hideLoader();
                });
        }
        else {
            $scope.statsList = [];
            $scope.validationMsg = true;
            $scope.hideLoader();
        }
    }

    $scope.GetStatsCalculation = function (total, data) {
        var cal = (data * 100) / total;
        return cal.toPrecision(2);
    }


    $scope.createChart = function (stats, id) {
        if (stats.data != null) {
            setTimeout(function () {
                var labelchart = [];
                var datachart = [];

                angular.forEach(stats.data.rows, function (row, key) {
                    labelchart.push(row.dimensions[0]);
                    datachart.push($scope.GetStatsCalculation(stats.data.totals[0].values[1], row.metrics[0].values[1]))
                });
                var piectx = document.getElementById('piechart-' + id).getContext("2d");
                piectx.des
                new Chart(piectx, {
                    type: 'doughnut',
                    data: {
                        labels: labelchart,
                        datasets: [{
                            label: "",
                            data: datachart,
                            backgroundColor: [
                                'rgba(0, 30, 98, 1)',
                                'rgba(0, 199, 177, 1)',
                                'rgba(218, 170, 0, 1)'
                            ],
                            borderColor: [
                                'rgba(0, 30, 98, 1)',
                                'rgba(0, 199, 177, 1)',
                                'rgba(218, 170, 0, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        animation: {
                            animateScale: true,
                            animateRotate: true
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        legend: {
                            position: 'right',
                            labels: {
                                boxWidth: 10,
                                padding: 12
                            }
                        },
                    }
                });

            }, 1000);
        }
    }


    $scope.createBarChart = function (stats, id) {
        if (stats.data != null) {
            setTimeout(function () {
                var labelchart = [];
                var datachart = [];
                angular.forEach(stats.data.rows, function (row, key) {
                    labelchart.push(row.dimensions[0]);
                    datachart.push($scope.GetStatsCalculation(stats.data.totals[0].values[1], row.metrics[0].values[1]))
                });
                var piectx = document.getElementById('piechart-' + id).getContext("2d");
               new Chart(piectx, {
                    type: 'bar',
                    data: {
                        labels: labelchart,
                        datasets: [{
                            data: datachart,
                            backgroundColor: ["#DAAA00", "#DAAA00", "#DAAA00", "#DAAA00", "#DAAA00", "#DAAA00", "#DAAA00"],
                        }]
                    },
                    options: {
                        indexAxis: 'y',
                        responsive: true,
                        plugins: {
                            legend: {
                                display: false,
                            }
                        }
                    }
                });

            }, 1000);
        }
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
