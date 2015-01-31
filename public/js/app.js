define(['angular', 'jquery','angular-route', 'jquery-cookie'], function(angular, $){
	app = angular.module('soapbox', ['ngRoute']);
	app.config(function($httpProvider, $routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/',
			{
				controller: 'splashController',
				templateUrl: '/partials/splashlist.html',
				resolve: {
				    latlong: ["$q","$rootScope", "splashFactory",function($q, $rootScope, splashFactory)
				       {
				        var deferred = $q.defer();
			            getLocation(deferred, $rootScope, splashFactory);
				        return deferred.promise;
				       }]
				   }
			})
			.when('/splash/:splash_id',
			{
			  controller: 'splashController',
			  templateUrl: '/partials/splashlist.html',
			  resolve: {
			  	  latlong: ["$q","$rootScope", "splashFactory",function($q, $rootScope, splashFactory)
			  	       {
			  	        var deferred = $q.defer();
			              getLocation(deferred, $rootScope, splashFactory);
			  	        return deferred.promise;
			  	       }]
			  	   }
			  	   
			}) 
			.when('/login',
			{
			  controller: 'loginController',
			  templateUrl: 'partials/login.html',
			  resolve: {
			  	hideMap: [function(){
			  		$("#meta-container").hide()	;
			  		$("#postLoginNav").hide()
			  	}]
			  }
			})        
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
	 });
	app.run( function($rootScope, $location, $http, $route) {
		$http.defaults.headers.common.Authorization = $.cookie('access_token');
		$rootScope.$on("access_token_changed", function(){			
			$http.defaults.headers.common.Authorization = $.cookie('access_token');
			$rootScope.loggedUser = $.cookie('access_token');
		});
	    // register listener to watch route changes
	    $rootScope.$on("$routeChangeStart", function(event, next, current) {
	      $rootScope.loggedUser = $.cookie('access_token');
	      if ( $rootScope.loggedUser == null ) {
	        // no logged user, we should be going to #login
	        if ( next.templateUrl == "partials/login.html" ) {
	          // already going to #login, no redirect needed
	 
	        } 
	        else {
	          // not going to #login, we should redirect now

	          $location.path( "/login" );
	        }
	      }         
	    });


	    var original = $location.path;
	    $location.path = function (path, reload) {
	        if (reload === false) {
	            var lastRoute = $route.current;
	            var un = $rootScope.$on('$locationChangeSuccess', function () {
	                $route.current = lastRoute;
	                un();
	            });
	        }
	        return original.apply($location, [path]);
	    };
	 });

	function getLocation(deferred, $rootScope, splashFactory){
		if( $rootScope.latlong == null)
		{
			$("#loading-message").slideToggle();
			$("#loading-text").text("Getting your location... ")
			if(navigator.geolocation){

				navigator.geolocation.getCurrentPosition(function(data){
					$rootScope.latlong = data
					$rootScope.$broadcast("coordsSet");
					splashFactory.initializeVals(deferred, data, $rootScope)
					
				// $("#loading-message").slideToggle();
				}, handleDenial);
			}
			else
				handleDenial();
		}
		else
		{
			deferred.resolve($rootScope.latlong)
		}

			
		
	}

	function handleDenial(error){
		if(!error)
		{
			$("#ngview").text("Geolocation required to use app. Please check your location settings.")
		}
		if(error.code === error.POSITION_UNAVAILABLE)
			{
				$("#ngview").text("We are unable to obtain your position from HTML5 Geolocation. Please try again.")
			}	
		else if(error.code === error.TIMEOUT)
			{
				$("#ngview").text("Timed out while obtaining position. Please try again")
			}	
		else if(error.code === error.PERMISSION_DENIED)
		{
			$("#ngview").text("Geolocation required to use app. Please check your location settings.")
			}
		
	}
	return app;
});