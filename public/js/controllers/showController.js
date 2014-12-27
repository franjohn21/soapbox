define(['app', 'jquery', 'jquery-ui','factories/splashFactory'],function(app, $){

	app.controller('showController', function($scope, splashFactory, $routeParams){

		$scope.routeParams = $routeParams
		splashFactory.getSplash($scope, $routeParams.splash_id)
	})

});
