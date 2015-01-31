define(['app', 'jquery', 'jquery-ui','factories/splashFactory', 'smooth-scroll'],function(app, $){
	
	app.controller('splashController', function($scope, splashFactory, latlong, $rootScope, $routeParams, $location){
		$scope.filter_id = 0
		$scope.splashes = []
		$scope.comments = []

		function init(){
 	   
			$("#postLoginNav").show("fast", function(){
				$("#postLoginNav").addClass("slideLeft");
			});
			$("#meta-container").show();
			$("#map-container").addClass("fadeIn");
			$("#splashList").addClass("fadeIn");

			if($rootScope.newUser === true){
				$rootScope.$broadcast('newuser')
			}
			splashFactory.initialRetrieval($scope);

			setInterval(function(){
				splashFactory.getSplashes($scope, latlong);
			}, 10000);
		}

		$scope.$on('clickedSplash', function(){
			var splash = splashFactory.getClickedSplash();
			$location.path('/splash/' + splash.id, false);
			$scope.needComments = true;

		})
		$scope.changeRoute = function(splash, evt, reply){
			evt.preventDefault();
			splashFactory.clickedSplash(splash.id);
			if(reply === true){
				$('.reply').slideToggle();
			}
		}

		$scope.isFavorited = function(splash){
			return splash.userSplash.favorited
		}
		$scope.upVote = function(splash, evt){
			splashFactory.toggleFavorite(splash);
			if (evt.stopPropagation) evt.stopPropagation();
			if (evt.preventDefault) evt.preventDefault();
			evt.cancelBubble = true;
		    evt.returnValue = false;
		}

		$scope.$on('newSplash', function(){
			splashFactory.setNew($scope);
		});

		$scope.showSplashInMap = function(splash){
			$("#splash-"+splash.id).addClass("navbar-inverse lighten");
			$("#splash-"+splash.id).removeClass("navbar-default");
			splashFactory.activeSplash(splash);
		}

		$scope.removeSplashFromMap = function(splash){
			$("#splash-"+splash.id).removeClass("navbar-inverse lighten");
			$("#splash-"+splash.id).addClass("navbar-default");
			splashFactory.removeSplashCoords($rootScope);
		}

		$scope.$on('mapActive', function(){
			$scope.mapActive = splashFactory.getMapActive();
			$("#splash-"+$scope.mapActive.id).addClass("navbar-inverse lighten");
			$("#splash-"+$scope.mapActive.id).removeClass("navbar-default");
			$.smoothScroll({
				scrollElement: $("#ngview"),
				scrollTarget: $("#splash-"+$scope.mapActive.id),
				offset: -350
			})

		})
		$scope.$on('mapLeave', function(){
			$("#splash-"+$scope.mapActive.id).addClass("navbar-default");
			$("#splash-"+$scope.mapActive.id).removeClass("navbar-inverse lighten");
			$scope.mapActive = ""
		})

		$scope.splashFilter = function(splash){
			if($scope.filter_id > 0)
			{
				if(splash.id === $scope.filter_id)
					return splash
			}
			else
			{
				return splash
			}
		}	

		$scope.$on('$routeChangeSuccess', function(){
			console.log('route change?')
			if($location.path() === "/")
			{
				splashFactory.clearComments($scope);
				$(".reply").hide();
				$scope.filter_id = 0
			}
			else if($location.path().indexOf("splash") > -1)
			{
				splashFactory.clearComments($scope);
				$scope.filter_id = parseInt($location.path().match(/\d+/g)[0])
				splashFactory.getComments($scope);
			}
		});
		$scope.$on('$locationChangeSuccess', function(){
			console.log('location change?')
			if($location.path() === "/")
			{
				splashFactory.clearComments($scope);
				$(".reply").hide();
				$scope.filter_id = 0
			}
			else if($location.path().indexOf("splash") > -1)
			{
				splashFactory.clearComments($scope);
				$scope.filter_id = parseInt($location.path().match(/\d+/g)[0])
				splashFactory.getComments($scope);
			}
		});
		$scope.checkUser = function(data){
			if(data.userInfo.fb_id === localStorage.getItem('fb_id'))
			{
				return true
			}
			else 
				return false;
		}

		$scope.deleteItem = function(data, evt, type){
			if(confirm('Are you sure you want to delete this?') === true)
			{
				if(type === "splash")
				{
					splashFactory.deleteSplash(data, $scope)
				}
				else
				{
					splashFactory.deleteComment(data, $scope)
				}
			}
			if (evt.stopPropagation) evt.stopPropagation();
			if (evt.preventDefault) evt.preventDefault();
			evt.cancelBubble = true;
		    evt.returnValue = false;
		}

		$scope.reply = function(splash, evt){
			if($location.path().indexOf("splash") > -1)
			{
				if(parseInt($location.path().match(/\d+/g)[0]))
				{
					$(".reply").slideToggle();
					return
				}
			}
			$scope.changeRoute(splash, evt, true)
		}

		$scope.addComment = function(){
			splashFactory.postComment($scope, $('#commentContent').val());
			splashFactory.getComments($scope);
			splashFactory.getSplash($scope.filter_id);

			$(".reply").slideToggle();
			$('#commentContent').val("")

		}

		init();
	});

})