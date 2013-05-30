angular.module( 'ngMeanStack', [
  'app-templates',
  'component-templates',
  'ngMeanStack.about'
])

.config( function myAppConfig ( $routeProvider ) {
  $routeProvider.otherwise({ redirectTo: '/about' });
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
})

;

