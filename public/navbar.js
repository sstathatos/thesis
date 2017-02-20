var home=angular.module('home', ['ngSanitize', 'ui.bootstrap','ngMessages']);

home.controller('ModalDemoCtrl',['$uibModal', function ($uibModal) {
  var $ctrl = this;
      $ctrl.open = function () {
          console.log("something");
        var modalInstance = $uibModal.open({
            ariaLabelledBy: 'modal-title',
          ariaDescribedBy: 'modal-body',
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          controllerAs: '$ctrl'
        });
      };
}]);

// Please note that $uibModalInstance represents a modal window (instance) dependency.
// It is not the same as the $uibModal service used above.

home.controller('ModalInstanceCtrl',['$uibModalInstance','$scope','$http','$window',function ($uibModalInstance,$scope,$http,$window) {
  var $ctrl = this;

  $ctrl.x = function () {
      console.log("x pressed");
    $uibModalInstance.close('cancel');
  };

  $ctrl.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
  $ctrl.save= function() {
      if ($scope.editname.length!=0 & $scope.editpass1!=null & $scope.editpass2== $scope.editpass1)
      {
          console.log("edit acceptable");
          var data = {
              'name':$scope.editname,
              'password':$scope.editpass1
          };
          console.log(data);

          $http({
              method:'PUT',
              url:'/users',
              data: data
          }).then(function successCallback(res) {
              console.log("all done");
            //   $http({
            //       method:'GET',
            //       url:'/home',
            //   }).then(function successCallback(res) {
            //       console.log("all alla done");
                   $uibModalInstance.close('close');

                   
                   $window.location.reload();
            //     }, function errorCallback(res) {
            //        console.log(res.status);
            //        console.log("something went wrong");
            //     });

             }, function errorCallback(res) {
                  console.log(res.status);
                  console.log("something went wrong");
          });

      }
      else {
          console.log("edit not acceptable");
      }
  }
}]);
