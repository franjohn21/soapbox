define(['app', 'moment', 'angular'], function(app, moment){
	app.factory('splashFactory',function($http, $rootScope){

		var _splashes = {}
 		var factory = {}
 		var splashCoords = {}
 		var newSplash = {}	
 		var activeSplash = {}
 		var mapActiveSplash = {}
 		var showSplash = {}
 		function formatSplashes($scope){
 			var splashesArray = []

 			for(var id in _splashes)
 			{
				splashesArray.push(_splashes[id])
 			}
 			$scope.splashes = splashesArray;
 		}

 		function formatDistance(distance){
 			if(distance < 50)
 			{
 				return "50 meters"
 			} 			
 			else if(distance < 150)
 			{
 				return "150 meters"
 			}
 			else if(distance < 500)
 			{
 				return "500 meters"
 			}
 			else 
 			{
 				//distance <= 1000 km
 				return "1 kilometer"
 			}
 		}

		factory.getSplashes = function($scope, latlong){
			$http.get('http://localhost:3000/', {params: {latitude: latlong.coords.latitude, longitude: latlong.coords.longitude }})
				 .success(function(data){
				 	data.forEach(function(data){
				 		var splash = data

				 		if(!_splashes[splash.id])
				 		{
				 			splash.formatted_time = moment(splash.splashInfo.created_at).fromNow()
				 			splash.formatted_distance = formatDistance(splash.userSplash.distance_in_meters)
				 			_splashes[splash.id] = splash

				 		}
				 		else
				 		{
				 			_splashes[splash.id].score = data.score;
				 			_splashes[splash.id].userSplash.favorited = data.userSplash.favorited;
				 			_splashes[splash.id].formatted_time = moment(_splashes[splash.id].splashInfo.created_at).fromNow()
				 		}
				 	})
				 	$rootScope.$broadcast("retrievedSplashes");	
				 	formatSplashes($scope);
				 })
				 .error(function(data, status, headers, config){
				 	console.log("ERROR: ")
				 });
		}

		factory.getSplash = function($scope, splash_id){
			if(_splashes[splash_id])
			{
				showSplash = _splashes[splash_id]
				$rootScope.$broadcast("retrievedSplash");	
				return showSplash;
			}
			else
			{
				$http.get('http://localhost:3000/splashes/' + splash_id)
					.success(function(data){
						showSplash = data;
						showSplash.formatted_time = moment(showSplash.splashInfo.created_at).fromNow();
						$scope.splash = showSplash;
						$rootScope.$broadcast("retrievedSplash");	

					})
					.error(function(data){
						console.log('something went wrong')
					})
			}
		}

		factory.toggleFavorite = function(splash){
			$http.post('http://localhost:3000/splashes/' + splash.id + '/toggle_favorite')
				.success(function(data)
				{
					console.log('upvoted successfully')
				})
				.error(function(data){

				})
			console.log(_splashes)
			console.log(splash)
			// _splashes[splash.id].userSplash.favorited = !_splashes[splash.id].userSplash.favorited
			// var toggleVote = _splashes[splash.id].userSplash.favorited ? 1 : -1; 
			// _splashes[splash.id].score += toggleVote
		}

		factory.postSplash = function($scope, latlong){
			$http.post('http://localhost:3000/splashes', {content: $scope.content, latitude: latlong.coords.latitude, longitude: latlong.coords.longitude })
				 .success(function(data){
				 	newSplash = data
				 	newSplash.formatted_time = moment(data.created_at).calendar()
				 	newSplash.formatted_distance = formatDistance(data.userSplash.distance_in_meters)
				 	$rootScope.$broadcast('newSplash');
				 })
				 .error(function(data){
				 	console.log('something went wrong')
				 })
		}

		factory.activeSplash = function(splash){
			activeSplash = splash;
			$rootScope.$broadcast('splashEnter');
		}

		factory.getActiveSplash = function(){
			return activeSplash;
		}
		factory.getIndivSplash = function(){
			return showSplash;
		}
		factory.removeSplashCoords = function($rootScope){
			$rootScope.$broadcast('splashLeave');
		}

		factory.retrieveSplashes = function(){
			return _splashes
		}

		factory.setMapActive = function(splash){
			mapActiveSplash = splash;
			$rootScope.$broadcast('mapActive')
		}

		factory.getMapActive = function(){
			return mapActiveSplash;
		}

		factory.removeMapActive = function(){
			$rootScope.$broadcast('mapLeave')
		}

		factory.setNew = function($scope){
			if(!_splashes[newSplash.id])
			{
				_splashes[newSplash.id] = newSplash
			}
			$scope.splashes.push(newSplash)




		}

		factory.getNew = function(){
			return newSplash;
		}

		return factory;

	})	

});