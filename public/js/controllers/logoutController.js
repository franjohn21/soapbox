define(['app', 'jquery', 'jquery-cookie'], function(app, $){
  app.controller('logoutController', function($scope, $http, $rootScope, $location){

    $scope.logout = function() {
      //Log Out of FB
      // FB.logout(function(response) {

      // });
      // Clearing Server
      $http.get('https://soapboxapi.herokuapp.com/users/clear_session');
      // Clear Client
      localStorage.clear();

      $.removeCookie("access_token")
      $rootScope.$broadcast("access_token_changed");
      $location.path("/login");
    }
    $scope.$on('newuser', function(){
      $scope.openAbout();
      $rootScope.newUser = false
    });

    $scope.openAbout = function(){
      console.log('open about?');
      $scope.displayModal = true;
      $("#infoModal").show();
      $("#infoModal .modal-dialog").addClass("slideDown");
      $("#navbar-header").addClass("addBlur")
      $("#navbar-right").addClass("addBlur")
      $("#ngview").addClass("addBlur");
      $("#newsplash").addClass("addBlur");
      $("#map-controller").addClass("addBlur");

    }

    $scope.closeAbout = function(){
      console.log('close about?');
      $("#navbar-header").removeClass("addBlur")
      $("#navbar-right").removeClass("addBlur")
      $("#ngview").removeClass("addBlur");
      $("#newsplash").removeClass("addBlur");
      $("#map-controller").removeClass("addBlur");
      $scope.displayModal = false;

    }

  });

});