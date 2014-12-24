define(['angular', 'jquery','angular-route'], function(angular, $){
	app = angular.module('soapbox', ['ngRoute']);
	// app.config(function($routeProvider){

	// 	$routeProvider
	// 		.when('/',
	// 		{
	// 			controller: 'splashController'
	// 		})
	// 		.when('/splashes',
	// 		{
	// 			controller: 'splashController',
	// 			templateUrl: '/splashes'
	// 		})
	// 		.otherwise({redirectTo: '/'})
	// }) 
	return app
});