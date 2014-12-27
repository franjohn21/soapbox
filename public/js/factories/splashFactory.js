define(['app', 'moment', 'angular'], function(app, moment){
	app.factory('splashFactory',function($http){

		var _splashes = {}
 		var factory = {}

 		function formatSplashes($scope){
 			var splashesArray = []

 			for(var id in _splashes)
 			{
				splashesArray.push(_splashes[id])
 			}
 			$scope.splashes = splashesArray;
 		}

		factory.getSplashes = function($scope){
			$http.get('http://localhost:3000/')
				 .success(function(data){
				 	console.log('successful?')
				 	data.forEach(function(data){
				 		var splash = data.splashInfo
				 		if(!_splashes[splash.id])
				 		{
				 			splash.formatted_time = moment(splash.created_at).calendar()
				 			splash.userInfo = data.userInfo;
				 			splash.favorited = data.favorited;
				 			_splashes[splash.id] = splash

				 		}
				 	})	
				 	formatSplashes($scope);
				 })
				 .error(function(data, status, headers, config){
				 	console.log("ERROR: ")
				 });
		}

		factory.getSplash = function($scope, splash_id){
			if(_splashes[splash_id])
			{
				$scope.splash = _splashes[splash_id]
				console.log($scope.splash)
			}
			else
			{
				$http.get('http://localhost:3000/splashes/' + splash_id)
					.success(function(data){
						$scope.splash = data.splashInfo;
				 		$scope.splash.userInfo = data.userInfo;
				 		$scope.splash.favorited = data.favorited;
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
			_splashes[splash.id].favorited = !_splashes[splash.id].favorited
		}

		factory.postSplash = function($scope){
			$http.post('http://localhost:3000/splashes', {content: $scope.content})
				 .success(function(data){
				 	splash = data.splashInfo;
				 	splash.userInfo = data.userInfo;
				 	splash.favorited = data.favorited;
				 	_splashes[splash.id] = splash;
				 	$scope.splashes.push(splash);
				 })
				 .error(function(data){
				 	console.log('something went wrong')
				 })
		}

		return factory;

	})	

});