var home=angular.module('home',[]);
home.directive("navBar", function() {
    return {
        templateUrl:'./directives/navbar.html',
        replace:true
    }
});
