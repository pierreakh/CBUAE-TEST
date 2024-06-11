var app = angular.module("CORPORATE", ['ngCookies', 'angularUtils.directives.dirPagination'])

var searchResult = document.getElementById('searchResult');
var searchHeader = document.getElementById('searchHeader');
var online = document.getElementById('online');
var khservices = document.getElementById('kh-services');
var centers = document.getElementById('centers');
var mediaController = document.getElementById('MediaController');
var mediaController1 = document.getElementById('MediaController1');

angular.element(document).ready(function () {
    angular.bootstrap(searchResult, ['CORPORATE']);
    angular.bootstrap(searchHeader, ['CORPORATE']);
    angular.bootstrap(online, ['CORPORATE']);
    angular.bootstrap(khservices, ['CORPORATE']);
    angular.bootstrap(centers, ['CORPORATE']);
    angular.bootstrap(mediaController, ['CORPORATE']);
    angular.bootstrap(mediaController1, ['CORPORATE']);
});