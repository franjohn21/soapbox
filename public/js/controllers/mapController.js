define(['app', 'jquery', 'jquery-ui', 'googmarker', 'factories/splashFactory',],function(app, $){
		app.controller('mapController', function($scope, $rootScope, splashFactory, $location){
			var initLatLng = {}
			function addMarker(id){
				$scope.markers[id] = new google.maps.Marker({
					position: new google.maps.LatLng($scope.splashes[id].splashInfo.latitude, $scope.splashes[id].splashInfo.longitude),
					map: $scope.map,
					animation: google.maps.Animation.DROP
				});
				$scope.splash = $scope.splashes[id]
				$scope.infoWindows[id] = new google.maps.InfoWindow({
					content: [
					  '<div class="info-window">',
					  '<div class="info-content clearfix">',
					  '<div class="clearfix">',
					  '<div class="info-image">',
					  '<img class="fb_img" src="' + $scope.splashes[id].userInfo.profile_pic + '" />',
					  '</div>',
					  '<div class="info-name user-name">' + $scope.splashes[id].userInfo.first_name + '</div>',
					  '</div>',
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
					splashFactory.clickedSplash(id)
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

			$scope.$on('splashEnter', function(){
				$scope.currSplash = splashFactory.getActiveSplash();
				if($scope.infoWindows[$scope.currSplash.id].clicked !== true)
				{
					$scope.infoWindows[$scope.currSplash.id].disableAutoPan = false
					$scope.infoWindows[$scope.currSplash.id].open($scope.map, $scope.markers[$scope.currSplash.id])
					$scope.infoWindows[$scope.currSplash.id].clicked = false;
				}
			})
			$scope.$on('splashLeave', function(){
				if($scope.infoWindows[$scope.currSplash.id].clicked === false)
				{
					$scope.infoWindows[$scope.currSplash.id].close();
					$scope.infoWindows[$scope.currSplash.id].disableAutoPan = true;
				}
			})

			$scope.$on("coordsSet", function(){
				$scope.markers = {};
				$scope.infoWindows = {};
				initLatLng = new google.maps.LatLng($rootScope.latlong.coords.latitude, $rootScope.latlong.coords.longitude)

				var mapOptions = {
				  center: initLatLng,
				  zoom: 16
				};

				$scope.map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				var GeoMarker = new GeolocationMarker($scope.map);

			})

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
				google.maps.event.trigger($scope.map, 'resize');

			})
			$scope.$on('initialRetrieval', function(){
				google.maps.event.trigger($scope.map, 'resize');
				$scope.map.setCenter(initLatLng)
			})
			$scope.$on('retrievedSplash', function(){
				$scope.currSplash = splashFactory.getIndivSplash();
				console.log($scope.currSplash)
				clearAllButCurrent();
			})

			$scope.$on('newSplash', function(){
				$scope.newSplash = splashFactory.getNew();
				$scope.splashes[$scope.newSplash.id] = $scope.newSplash
				addMarker($scope.newSplash.id)
			})

		

			$scope.$on('clickedSplash', function(){
				splash = splashFactory.getClickedSplash();
				$scope.infoWindows[splash.id].clicked = true; 
				$scope.infoWindows[splash.id].open($scope.map, $scope.markers[splash.id]);
			})
		});
});
