define(['app', 'angular'], function(app){
	app.factory('splashFactory',function($http){

		var _splashes = {}

		var factory = {}
		factory.getSplashes = function(){
			$http.get('http://localhost:3000/')
				 .success(function(data, status, headers, config){
				 	data.forEach(function(splash){
				 		if(!_splashes[splash.id])
				 		{
				 			_splashes[splash.id] = splash
				 		}
				 	})
			
				 })
				 .error(function(data, status, headers, config){
				 	console.log("ERROR: ")
				 	console.log(data, status, headers, config)
				 })
			return _splashes
		}

		factory.postSplash = function(){
			$http.post('http://localhost:3000/splashes')
				 .success(function(data){
				 	console.log('post successful')
				 })
				 .error(function(data){
				 	console.log('something went wrong')
				 })
		}

		return factory;

	})	

});