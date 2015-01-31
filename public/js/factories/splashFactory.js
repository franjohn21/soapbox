define(['app', 'moment',  'jquery', 'angular', 'jquery-cookie'], function(app, moment, $){
	app.factory('splashFactory',function($http, $rootScope, $location){

		var _splashes = {}
 		var factory = {}
 		var splashCoords = {}
 		var newSplash = {}	
 		var activeSplash = {}
 		var mapActiveSplash = {}
 		var showSplash = {}
 		var _comments = {}
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
 		function formatComments($scope){
 			var commentsArray = []
 			for(var id in _comments)
 			{
				commentsArray.push(_comments[id])
 			}
 			$scope.comments = commentsArray;

 		}
		factory.getSplashes = function($scope, latlong){
			$http.get('https://soapboxapi.herokuapp.com/', {params: {latitude: latlong.coords.latitude, longitude: latlong.coords.longitude }})
				 .success(function(data){
				 	data.forEach(function(splash){
				 		if(!_splashes[splash.id])
				 		{
				 			splash.formatted_time = moment(splash.splashInfo.created_at).fromNow()
				 			splash.formatted_distance = formatDistance(splash.userSplash.distance_in_meters)
				 			_splashes[splash.id] = splash;
				 			splash.formatted_comments = splash.comments === 1 ? "comment" : "comments";

				 		}
				 		else
				 		{
				 			_splashes[splash.id].score = splash.score;
				 			_splashes[splash.id].userInfo.score = splash.userInfo.score;
				 			_splashes[splash.id].userSplash.favorited = splash.userSplash.favorited;
				 			_splashes[splash.id].formatted_time = moment(_splashes[splash.id].splashInfo.created_at).fromNow()
				 			_splashes[splash.id].comments = splash.comments
				 			_splashes[splash.id].formatted_comments = splash.comments === 1 ? "comment" : "comments";
				 		}
				 	})
				 	$rootScope.$broadcast("retrievedSplashes");	
				 	formatSplashes($scope);
				 })
				 .error(function(data, status, headers, config){
				 	console.log("ERROR: ")
				 });
		}

		factory.getSplash = function(splash_id){
			if(_splashes[splash_id])
			{
				showSplash = _splashes[splash_id];
				$rootScope.$broadcast('clickedSplash')
				return showSplash;

			}
			else
			{
				$http.get('https://soapboxapi.herokuapp.com/splashes/' + splash_id)
					.success(function(data){
						showSplash = data;
						showSplash.formatted_time = moment(showSplash.splashInfo.created_at).fromNow();
						splash.formatted_comments = splash.comments === 1 ? "comment" : "comments";
						$scope.splash = showSplash;
						$rootScope.$broadcast('clickedSplash')

					})
					.error(function(data){
						console.log('something went wrong')
					})
			}
		}

		factory.toggleFavorite = function(splash){
			$http.post('https://soapboxapi.herokuapp.com/splashes/' + splash.id + '/toggle_favorite')
				.success(function(data)
				{
					console.log('upvoted successfully')
				})
				.error(function(data){

				})
			_splashes[splash.id].userSplash.favorited = !_splashes[splash.id].userSplash.favorited
			var toggleVote = _splashes[splash.id].userSplash.favorited ? 1 : -1; 
			_splashes[splash.id].score += toggleVote
		}

		factory.postSplash = function($scope, latlong){
			$http.post('https://soapboxapi.herokuapp.com/splashes', {content: $scope.content, latitude: latlong.coords.latitude, longitude: latlong.coords.longitude })
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
		factory.getComments = function($scope){
			$http.get('https://soapboxapi.herokuapp.com/splashes/'+ showSplash.id + '/comments')
				.success(function(comments){
					comments.forEach(function(comment){
						if(!_comments[comment.id]){
							comment.formatted_time = moment(comment.commentInfo.created_at).fromNow()
							_comments[comment.id] = comment
						}
					})
					formatComments($scope);
				})
				.error(function(data){
					console.log("comments error")
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
		factory.initialRetrieval = function($scope){
			formatSplashes($scope);
			$rootScope.$broadcast("initialRetrieval");	

		}
		factory.retrieveSplashes = function(){
			return _splashes;
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
		factory.clickedSplash = function(splash_id){
			showSplash = this.getSplash(splash_id);
		}
		factory.getClickedSplash = function(){
			return showSplash;
		}

		factory.getNew = function(){
			return newSplash;
		}

		factory.clearComments = function($scope){
			_comments = {};
			$scope.comments = [];
		}

		factory.deleteSplash = function(splash, $scope){
			$http.delete('https://soapboxapi.herokuapp.com/splashes/' + splash.id)
				.success(function(){
					console.log('deleted')
				})
				.error(function(){
					console.log('not deleted')
				})
			delete _splashes[splash.id]
			formatSplashes($scope);
		}

		factory.deleteComment = function(comment, $scope){
			$http.delete('https://soapboxapi.herokuapp.com/splashes/' + comment.commentInfo.splash_id + '/comments/' + comment.id)
				.success(function(){
					console.log('deleted')
				})
				.error(function(){
					console.log('not deleted')
				})
			delete _comments[comment.id]
			formatComments($scope);
		}

		factory.initializeVals = function(deferred, latlong, $rootScope){
			var obj = {}
			obj.splashes = []		
			$("#loading-text").text("Retrieving splashes...")
			$http.get('https://soapboxapi.herokuapp.com/', {params: {latitude: latlong.coords.latitude, longitude: latlong.coords.longitude }})
				 .success(function(data){
				 	data.forEach(function(splash){
				 		if(!_splashes[splash.id])
				 		{
				 			splash.formatted_time = moment(splash.splashInfo.created_at).fromNow()
				 			splash.formatted_distance = formatDistance(splash.userSplash.distance_in_meters)
				 			_splashes[splash.id] = splash;
				 			splash.formatted_comments = splash.comments === 1 ? "comment" : "comments";

				 		}
				 		else
				 		{
				 			_splashes[splash.id].score = splash.score;
				 			_splashes[splash.id].userInfo.score = splash.userInfo.score;
				 			_splashes[splash.id].userSplash.favorited = splash.userSplash.favorited;
				 			_splashes[splash.id].formatted_time = moment(_splashes[splash.id].splashInfo.created_at).fromNow()
				 			_splashes[splash.id].comments = splash.comments
				 			_splashes[splash.id].formatted_comments = splash.comments === 1 ? "comment" : "comments";
				 		}
				 	})
				 	$("#loading-message").slideToggle();
				 	$rootScope.$broadcast("retrievedSplashes");	
				 	deferred.resolve(latlong)
				 })
				 .error(function(data, status, headers, config){
				 	console.log("Error Retrieving splashes ")
			 		$.cookie('access_token', "")
			 		$rootScope.loggedUser = null;
			 		$location.path('/login');
				 	deferred.resolve(latlong)
				 });
		}

		factory.postComment = function($scope, content){
			$http.post('https://soapboxapi.herokuapp.com/splashes/' + $scope.filter_id + '/comments', {content: content})
				.success(function(data){
					comment = data
					comment.formatted_time = moment(comment.commentInfo.created_at).fromNow()
					_comments[comment.id] = comment;
					_splashes[comment.commentInfo.splash_id].comments = _splashes[comment.commentInfo.splash_id].comments + 1
					_splashes[comment.commentInfo.splash_id].formatted_comment = _splashes[comment.commentInfo.splash_id].comments === 1 ? "comment" : "comments"
					formatComments($scope)
				})
				.error(function(){
					console.log('error on comment')
				})
		}

		return factory;

	})	

});