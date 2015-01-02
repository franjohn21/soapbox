define(['app', 'jquery', 'jquery-cookie'], function(app, $){
  
  app.controller('logoutController', function($scope, $http, $rootScope, $location){

     $scope.logout = function() {
            //Log Out of FB
            // FB.logout(function(response) {

            // });
            // Clearing Server
            $http.get('http://localhost:3000/users/clear_session');
            // Clear Client
            localStorage.clear();
            
            $.removeCookie("access_token")
            $rootScope.$broadcast("access_token_changed");
            $location.path("/login");
          }
      });
});