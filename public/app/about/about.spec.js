// about.spec.js - tests for about.js

describe("AboutCtrl", function () {

	var AboutCtrl, 
			$location, 
			$scope;

	beforeEach(module( 'ngMeanStack.about'));

	beforeEach( inject( function( $controller, _$location_, $rootScope ) {
		$location = _$location_;

		$scope = $rootScope.$new();

		AboutCtrl = $controller( 'AboutCtrl', { 
			$location: $location, 
			$scope: $scope 
		});

	}));

	// make sure controller exists
	it( 'Should have AboutCtrl defined', inject( function() {
		expect( AboutCtrl ).toBeDefined();
	}));

	it( 'Demo test on scope', inject( function () {
		expect( $scope.testExample() ).toBeTruthy();
	}));


});