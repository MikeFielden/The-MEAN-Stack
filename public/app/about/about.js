angular.module( 'ngMeanStack.about', [])

.config(function config( $routeProvider ) {
  $routeProvider.when( '/about', {
    controller: 'AboutCtrl',
    templateUrl: 'about/about.tpl.html'
  });
})

.controller( 'AboutCtrl', function AboutCtrl( $scope ) {
  
  // This is simple a demo for UI Boostrap.
  $scope.dropdownDemoItems = [
    "The first choice!",
    "And another choice for you.",
    "but wait! A third!"
  ];
})

;
