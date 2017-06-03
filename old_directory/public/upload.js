let app = angular.module('uploadModule', ['ui.grid']);


app.controller('uploaderCtrl', ['$scope', '$http', '$rootScope', '$window', function ($scope, $http, $rootScope, $window) {
    // $scope.myData = [
    //     {
    //         "firstName": "Cox",
    //         "lastName": "Carney",
    //         "company": "Enormo",
    //         "employed": true
    //     },
    //     {
    //         "firstName": "Lorraine",
    //         "lastName": "Wise",
    //         "company": "Comveyer",
    //         "employed": false
    //     },
    //     {
    //         "firstName": "Nancy",
    //         "lastName": "Waters",
    //         "company": "Fuelton",
    //         "employed": false
    //     }
    // ];


    $scope.filesChanged = function (elm) {
        $scope.file = elm.files;
        $scope.$apply();
    };
    $scope.upload = function (param) {
        let fd = new FormData();
        fd.append('data', $scope.file);
        $http({
            method: 'POST',
            url: '/get_create_project/' + param + '/datasets/create',
            data: fd,
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        }).then(function successCallback(msg) {
            console.log("all done");
            console.log(msg);
            $scope.file = {};
            $scope.loadDsets(param);
        }, function errorCallback(res) {
            console.log("something went wrong");
        });
    };

    // $scope.loadDsets = function (param) {
    //     $http({
    //         method: 'GET',
    //         url: '/get_create_project/' + param + '/datasets',
    //     }).then(function successCallback(data) {
    //
    //         console.log(data.data[0].data);
    //         $scope.myData = data.data[0].data;
    //     }, function errorCallback(res) {
    //         console.log("something went wrong");
    //     });
    // };

}]);

app.directive("fileInput", ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind('change', function () {
                $parse(attrs.fileInput)
                    .assign(scope, elm[0].files[0]);
                scope.$apply()
            })
        }
    }
}]);