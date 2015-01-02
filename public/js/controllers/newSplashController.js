define(['app', 'jquery', 'jquery-ui','factories/splashFactory'],function(app, $){
	app.controller('newSplashController', function($scope, splashFactory, $rootScope, $http){

		$scope.addSplash = function(data){
			$("#ngview").removeClass("addBlur");
			$("#newsplash").removeClass("addBlur");
			$("#map-controller").removeClass("addBlur");
			splashFactory.postSplash($scope, $rootScope.latlong)
			$scope.displayModal = false;
			$scope.content = ""
		}
		$scope.openModal = function(){
			$scope.displayModal = true;
			$("#splashModal").show();
			$(".modal-dialog").addClass("slideDown");
			$("#ngview").addClass("addBlur");
			$("#newsplash").addClass("addBlur");
			$("#map-controller").addClass("addBlur");

			$http.get('http://localhost:3000/users/reach')
				 .success(function(count){
				 	$scope.reach = count
				 })
				 .error(function(){
				 	console.log("reach errored")
				 })
		}
		$scope.closeModal = function(){
			$scope.displayModal = false;
			$("#ngview").removeClass("addBlur");
			$("#newsplash").removeClass("addBlur");
			$("#map-controller").removeClass("addBlur");
			$scope.content = ""
			
		}


	});

})