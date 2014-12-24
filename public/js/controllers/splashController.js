define(['app', 'jquery', 'jquery-ui','factories/splashFactory', 'blur'],function(app, $){
	app.controller('splashController', function($scope, splashFactory){
		
		$scope.splashes = []
		function init(){
			$scope.splashes = splashFactory.getSplashes();
			setInterval(function(){
				$scope.splashes = splashFactory.getSplashes();
			}, 10000);
		}

		$scope.upVote = function(){
			console.log($(this))
		}

		$scope.addSplash = function(data){
			splashFactory.postSplash($scope.content)
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