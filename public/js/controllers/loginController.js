define(['app', 'jquery', 'jquery-cookie'], function(app, $){

	app.controller('loginController', function($scope, $http, $rootScope, $location){
		$scope.login = function(){
			    FB.login(function(response) {
			      if (response.authResponse) {
			        //Setting Cookie
			        console.log(response)
			        var date = new Date();
			        date.setTime(date.getTime() + (10800000)); // 3 hours
			        $.cookie('access_token', response.authResponse.accessToken,{ expires: date, path: '/' });

			        localStorage.setItem('fb_id', response.authResponse.userID);
			        FB.api('/me', 
			           {fields: "id,about,picture.type(large).width(300),age_range,email,first_name,last_name,gender,hometown,location,locale"}, 
			           function(response) {
			              // Setting Client's localStorage
			              localStorage.setItem('email', response.email);
			              localStorage.setItem('first_name', response.first_name);
			              localStorage.setItem('last_name', response.last_name);
			              localStorage.setItem('gender', response.gender);
			              localStorage.setItem('profilePic', response.picture.data.url);
			              localStorage.setItem('age_range', response.age_range.min);
			              //Send Data Back to Server
			              $http.post('http://localhost:3000/users/sessioning_user', localStorage)
			               .success(function(data){
			                 localStorage.setItem('userId', data);
			                 $rootScope.loggedUser = data;
			                 $location.path('/')
			                 console.log($rootScope)
			                 console.log('good session')
			              })
			               .error(function(data){
			                 console.log(data.statusText);
			                 console.log('bad session')

			              });
			           }
			        );
			     } else {
			      console.log('User cancelled login or did not fully authorize.');
			      callback(false);
			    }
			  }, {scope: 'email', return_scopes: true});
			}

	});

});