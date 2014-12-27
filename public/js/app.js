define(['angular', 'jquery','angular-route'], function(angular, $){
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
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
	 }) 
	return app;
});