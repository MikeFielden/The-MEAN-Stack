// app.spec.js - test for app.js

describe( 'AppCtrl', function() {

	var AppCtrl, $location, $scope;

	beforeEach( module( 'ngMeanStack' ) );

	beforeEach( inject( function( $controller, _$location_, $rootScope ) {
		$location = _$location_;
		$scope = $rootScope.$new();
		AppCtrl = $controller( 'AppCtrl', { $location: $location, $scope: $scope });
	}));

	it( 'Should have appCtrl defined', inject( function() {
		expect( AppCtrl ).toBeDefined();
	}));


});