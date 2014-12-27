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
       "blur": "vendor/blur.min",
       "jquery-cookie":"vendor/jquery-cookie"
      },
      shim: {
        'angular': {'exports' : 'angular'},
        'angular-route' : ['angular'],
        'jquery': {'exports' : 'jquery'},
        'jquery-ui': ['jquery'],
        'jquery-cookie': ['jquery'],
        'blur': ['jquery']

      }

    });

require(['angular','jquery', 'app', 'controllers/splashController', 'controllers/showController','controllers/loginController'], function(angular, $, app){
    $(function(){
      
      angular.bootstrap($("#main"),[app['name']]);

    });
});
