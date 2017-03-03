var ctrl=angular.module('checkbox', []);

ctrl.controller('checkboxCtrl',['$http','$scope', function ($http,$scope) {
    $scope.submit=function() {
        $http({method:'POST',url:'/projects'})
            .then(function successCallback(res) {
                $scope.results=res.data;
                console.log(res);
            }, function errorCallback() {
                console.log("something went wrong while loading.");
            });
    }
}]);