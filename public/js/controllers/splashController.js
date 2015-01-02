define(['app', 'jquery', 'jquery-ui','factories/splashFactory', 'smooth-scroll'],function(app, $){
	
	app.controller('splashController', function($scope, splashFactory, latlong, $rootScope, $routeParams, $location){
		
		$scope.splashes = []
		$("#meta-container").show();
		function init(){
			splashFactory.getSplashes($scope, latlong);
			setInterval(function(){
				splashFactory.getSplashes($scope, latlong);
			}, 10000);
		}
		$scope.changeRoute = function(splash, evt){
			evt.preventDefault();
		    $location.path('/splash/' + splash.id, false)
		}

		$scope.isFavorited = function(splash){
			return splash.userSplash.favorited
		}
		$scope.upVote = function(splash, evt){
			evt.preventDefault();
			splashFactory.toggleFavorite(splash);
		}

		$scope.$on('newSplash', function(){
			splashFactory.setNew($scope);
		});

		$scope.showSplashInMap = function(splash){
			splashFactory.activeSplash(splash);
		}

		$scope.removeSplashFromMap = function(){
			splashFactory.removeSplashCoords($rootScope);
		}

		$scope.$on('mapActive', function(){
			$scope.mapActive = splashFactory.getMapActive();
			$("#splash-"+$scope.mapActive.id).addClass("mapActive");
			$.smoothScroll({
				scrollElement: $("#ngview"),
				scrollTarget: $("#splash-"+$scope.mapActive.id),
				offset: -350
			})

		})
		$scope.$on('mapLeave', function(){
			$("#splash-"+$scope.mapActive.id).removeClass("mapActive")
			$scope.mapActive = ""
		})

		$scope.splashFilter = function(splash){
			console.log("FUCKIGN FILTER")
			console.log($routeParams)
			if($routeParams.splash_id)
			{
				console.log(splash)
				console.log($routeParams.splash_id)
				if(splash.id === $routeParams.splash_id)
				{
					return splash
				}
			}
			else
			{
				return splash
			}
		}
		init();
	});

})