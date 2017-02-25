var ball=angular.module('ball', []);

ball.controller('ballController',['$scope', function ($scope) {
     console.log("i went here");
     $scope.golf="hello there guys";
}])