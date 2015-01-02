define(['app', 'jquery', 'jquery-ui', 'async!https://maps.googleapis.com/maps/api/js?key=AIzaSyAF7bNkrouk4BrhFzk3mFUIRlBceQsKxXo', 'factories/splashFactory'],function(app, $){


	require(['googmarker']);
	app.controller('mapController', function($scope, $rootScope, splashFactory, $location){
		function addMarker(id){
			$scope.markers[id] = new google.maps.Marker({
				position: new google.maps.LatLng($scope.splashes[id].splashInfo.latitude, $scope.splashes[id].splashInfo.longitude),
				map: $scope.map,
				animation: google.maps.Animation.DROP
			});
			$scope.infoWindows[id] = new google.maps.InfoWindow({
				content: [
				  '<div class="info-window">',
				  '<div class="info-content clearfix">',
				  '<img class="info-image fb_img" src="' + $scope.splashes[id].userInfo.profile_pic + '" />',
				  '<span class="info-name user-name">' + $scope.splashes[id].userInfo.first_name + '</span>',
				  '<br />',
				  '<p class="info-text">' + $scope.splashes[id].splashInfo.content + '</p>',
				  '</div>',
				  '<div class="info-timestamp splash-meta">',
				  '<span class="splash-reach"><i class="fa fa-users"></i> '+ $scope.splashes[id].reach + ' &nbsp;&nbsp;</span>',
				  '<span class="splash-created_at"><i class="fa fa-clock-o"></i> ' + $scope.splashes[id].formatted_time + ' &nbsp;&nbsp;</span>', 
				  '<span class="splash-distance"><i class="fa fa-globe"></i> ' + $scope.splashes[id].formatted_distance + '</span>',
				  '</div>',
				  '</div>'
				].join(''),
				disableAutoPan: true
			})
			google.maps.event.addListener($scope.markers[id], 'mouseover', function(data){
				if($scope.infoWindows[id].clicked !== true)
				{
					$scope.infoWindows[id].open($scope.map, $scope.markers[id]);
					$scope.infoWindows[id].clicked = false;
				}
				splashFactory.setMapActive($scope.splashes[id]);

			})
			google.maps.event.addListener($scope.markers[id], 'mouseout', function(){
				if($scope.infoWindows[id].clicked === false)
				{
					$scope.infoWindows[id].close();
				}
				splashFactory.removeMapActive($scope.splashes[id]);
				
			})

			google.maps.event.addListener($scope.markers[id], 'click', function(){
				$scope.infoWindows[id].clicked = true; 
				$scope.infoWindows[id].open($scope.map, $scope.markers[id]);
			})

			google.maps.event.addListener($scope.infoWindows[id], 'closeclick', function(){
				$scope.infoWindows[id].clicked = false;
			})
		}

		function clearAllButCurrent(){
			for(var id in $scope.markers){
				if(!(id == $scope.splash.id))
				{
					$scope.markers[id].setMap(null);
					$scope.infoWindows[id].close();
				}
			}
		}

		$scope.$on("coordsSet", function(){
			var currLat = $rootScope.latlong.coords.latitude
			var currLng = $rootScope.latlong.coords.longitude
			var currLatLng = new google.maps.LatLng(currLat, currLng)

			var mapOptions = {
			  center: currLatLng,
			  zoom: 15
			};
			$scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
			var GeoMarker = new GeolocationMarker($scope.map);
			$scope.markers = {};
			$scope.infoWindows = {};
			$scope.$on('retrievedSplashes', function(){
				if($location.path() === "/")
				{
					$scope.splashes = splashFactory.retrieveSplashes();
					for(var id in $scope.splashes)
					{
						if(!$scope.markers[id])
						{
							addMarker(id);
						}
					}
				}
			})

			$scope.$on('retrievedSplash', function(){
				$scope.splash = splashFactory.getIndivSplash();
				console.log($scope.splash)
				clearAllButCurrent();
			})

			// $scope.$on('newSplash', function(){
			// 	$scope.newSplash = splashFactory.getNew();
			// 	$scope.splashes[$scope.newSplash.id] = $scope.newSplash
			// 	addMarker($scope.newSplash.id)
			// })

			$scope.$on('splashEnter', function(){
				$scope.splash = splashFactory.getActiveSplash();
				if($scope.infoWindows[$scope.splash.id].clicked !== true)
				{
					$scope.infoWindows[$scope.splash.id].disableAutoPan = false
					$scope.infoWindows[$scope.splash.id].open($scope.map, $scope.markers[$scope.splash.id])
					$scope.infoWindows[$scope.splash.id].clicked = false;
				}
			})
			$scope.$on('splashLeave', function(){
				if($scope.infoWindows[$scope.splash.id].clicked === false)
				{
					$scope.infoWindows[$scope.splash.id].close();
					$scope.infoWindows[$scope.splash.id].disableAutoPan = true;
				}

			})
		});
	})

});
