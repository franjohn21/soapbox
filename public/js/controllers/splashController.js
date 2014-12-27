define(['app', 'jquery', 'jquery-ui','factories/splashFactory', 'blur'],function(app, $){
	app.controller('splashController', function($scope, splashFactory){
		
		$scope.splashes = []
		function init(){
			splashFactory.getSplashes($scope);
			setInterval(function(){
				splashFactory.getSplashes($scope);
			}, 10000);
		}
		$scope.isFavorited = function(splash){
			return splash.favorited
		}
		$scope.upVote = function(splash, evt){
			evt.preventDefault();
			splashFactory.toggleFavorite(splash);
		}

		$scope.addSplash = function(data){
			splashFactory.postSplash($scope, tempId)
			$scope.displayModal = false;
		}
		$scope.openModal = function(){
			$scope.displayModal = true;
		}
		$scope.closeModal = function(){
			$scope.displayModal = false;
		}

		init();

	});

})