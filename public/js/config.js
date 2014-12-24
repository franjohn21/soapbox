require.config({
     baseUrl: "js/",
     paths: {
       "moment": "vendor/moment",
       "please": "vendor/please",
       "underscore": "vendor/underscore",
       "ripples": "vendor/jquery.ripples",
       "jquery": "vendor/jquery-2.1.1.min",
       "angular": "vendor/angular",
       "angular-route": "vendor/angular-route.min",
       "jquery-ui": "vendor/jquery-ui",
       "blur": "vendor/blur.min"
      },
      shim: {
        'angular': {'exports' : 'angular'},
        'angular-route' : ['angular'],
        'jquery': {'exports' : 'jquery'},
        'jquery-ui': ['jquery'],
        'blur': ['jquery']

      }

    });

require(['angular','jquery', 'app', 'controllers/splashController'], function(angular, $){
    $(function(){
      angular.bootstrap($("#main"),['soapbox']);
    });
});
