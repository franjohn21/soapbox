define(['angular', 'jquery','angular-route', 'auth'], function(angular, $){
	app = angular.module('soapbox', ['ngRoute']);
	app.config(function($httpProvider, $routeProvider, $locationProvider){
		$locationProvider.html5Mode(true);
		$routeProvider
			.when('/',
			{
			  templateUrl: 'partials/splashlist.html'
			})
			.when('/user/:user_id/splash/:splash_id',
			{
			  controller: 'showController',
			  templateUrl: 'partials/showsplash.html'
			}) 
			.when('/login',
			{
			  controller: 'loginController',
			  templateUrl: 'partials/login.html'
			})        
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
	 });
	app.run( function($rootScope, $location) {

	    // register listener to watch route changes
	    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
	      if ( $rootScope.loggedUser == null ) {
	        // no logged user, we should be going to #login
	        if ( next.templateUrl == "partials/login.html" ) {
	          // already going to #login, no redirect needed
	        } else {
	          // not going to #login, we should redirect now
	          $location.path( "/login" );
	        }
	      }         
	    });
	 });

	return app;
});