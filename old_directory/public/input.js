const ctrl = angular.module('inputModule', []);

ctrl.controller('inputCtrl', ['$http', '$scope', function ($http, $scope) {
    $scope.member = 1;
    $scope.add = function () {
        $scope.member++;
    };
    $scope.getNumber = function (num) {
        return new Array(num);
    }
}]);