var myApp=angular.module('myApp', ['ui.bootstrap']);

myApp.controller('editProfileCtrl',['$uibModal','$scope', function ($uibModal,$scope) {
    var $ctrl = this;
      $ctrl.open = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'editProfileContent.html',
            controller: 'editProfileInstanceCtrl',
            controllerAs: '$ctrl'
        });
      };
}]);

myApp.controller('editProfileInstanceCtrl',['$uibModalInstance','$scope',function ($uibModalInstance,$scope) {
  var $ctrl = this;
  $ctrl.x = function () {
      console.log("x pressed");
      $uibModalInstance.close('cancel');
  };

  $ctrl.cancel = function () {

      $uibModalInstance.dismiss('cancel');
  };
}]);

myApp.controller('searchProjectCtrl',['$uibModal','$scope','$http', function ($uibModal,$scope,$http) {
    var $ctrl = this;
    $ctrl.open = function () {
        $uibModal.open({

            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'searchProfileContent.html',
            controller: 'searchProjectInstanceCtrl',
            controllerAs: '$ctrl',
            scope: $scope
        });
        console.log($scope);
    };
}]);

myApp.controller('searchProjectInstanceCtrl',['$uibModalInstance','$scope','$http',function ($uibModalInstance,$scope,$http) {
    var $ctrl = this;
    var myquery = $scope.$parent.projectquery;
    var data={
        'name':myquery
    };
    console.log(data);
    $http({
        method:'POST',
        url:'/projectss',
        data: data,
        headers: {'Content-Type': 'application/json'}
    }).then(function successCallback(res) {
        console.log(res.data);
        $scope.results=res.data;
    }, function errorCallback(res) {
        console.log("something went wrong");
    });
    $ctrl.x = function () {
        console.log("x pressed");
        $uibModalInstance.close('cancel');
    };

    $ctrl.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
}]);

myApp.controller('currentProjectsController',['$http','$scope', function ($http,$scope) {
    $scope.init=function() {
        $http({method:'GET',url:'/projects'})
            .then(function successCallback(res) {
                $scope.results=res.data;
                console.log(res);
            }, function errorCallback() {
                console.log("something went wrong while loading.");
            });
    };
    $scope.init();
}]);

