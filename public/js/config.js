require.config({
     baseUrl: "js/",
     paths: {
       "moment": "vendor/moment",
       "please": "vendor/please",
       "underscore": "vendor/underscore",
       "ripples": "vendor/jquery.ripples",
       "jquery": "vendor/jquery-2.1.1.min",
       "angular": "vendor/angular"
      },
      shim: {
        'angular': {'exports' : 'angular'}
      }

    });

require(['angular','jquery', 'app', 'controllers/index'], function(angular, $){
    $(function(){
      angular.bootstrap(document,['soapbox']);
    });
});
