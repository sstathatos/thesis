var myApp=angular.module('myApp', ['ui.bootstrap']);

myApp.controller('ModalDemoCtrl',['$uibModal', function ($uibModal) {
    var $ctrl = this;
      $ctrl.open = function () {
        $uibModal.open({
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            controllerAs: '$ctrl'
        });
      };
}]);

myApp.controller('ModalInstanceCtrl',['$uibModalInstance',function ($uibModalInstance) {
  var $ctrl = this;
  $ctrl.x = function () {
      console.log("x pressed");
      $uibModalInstance.close('cancel');
  };

  $ctrl.cancel = function () {
      $uibModalInstance.dismiss('cancel');
  };
}]);

myApp.controller('homeController',['$http','$scope', function ($http,$scope) {
    $scope.init=function() {
        $http({method:'GET',url:'/projects'})
            .then(function successCallback(res) {
                $scope.results=res.data;
            }, function errorCallback() {
                console.log("something went wrong while loading.");
            });
    }
    $scope.init();
}])
