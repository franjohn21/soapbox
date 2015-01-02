define(['app', 'jquery', 'jquery-ui','factories/splashFactory'],function(app, $){

	app.controller('showController', function($scope, splashFactory, $routeParams){
		$scope.splash = {}
		$scope.routeParams = $routeParams
		splashFactory.getSplash($scope, $routeParams.splash_id)

		$scope.isFavorited = function(splash){
			console.log($scope.splash);
			return false;
		}
		$scope.upVote = function(evt){
			evt.preventDefault();
			console.log($scope.splash.userSplash);
			console.log("WTF");
			splashFactory.toggleFavorite($scope.splash);
			$scope.splash.userSplash.favorited != $scope.splash.userSplash.favorited
			var toggleVote = $scope.splash.userSplash.favorited ? 1 : -1; 
			$scope.splash.score += toggleVote
		}
	})

});
