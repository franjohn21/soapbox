window.fbAsyncInit = function() {
        FB.init({
          appId      : '707092289381408',
          xfbml      : true,
          version    : 'v2.1',
          cookies    : true
        });
      };

(function(d, s, id){
var js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {return;}
	js = d.createElement(s); js.id = id;
	js.src = "//connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// var oauth = (function(){

// 	function login(){
// 		FB.getLoginStatus(function(response) {
// 		    if (response.status === 'connected') {
// 				$.ajax({
// 		         	url:  base_url+'/auth/facebook/callback',
// 		     	});
// 			}
// 			else if (response.status === 'not_authorized') {
// 			    Facebook.message(Facebook.authorize_message);
// 			    // the user is logged in to Facebook,
// 			    // but has not authenticated your app
// 			}
// 		  	else {
// 			  	FB.login(function(response){
// 	  				$.ajax({
// 	  		         	url:  base_url+'/auth/facebook/callback',
// 	  		     	});
// 			  	});
// 			    // the user isn't logged in to Facebook.
// 			  }
// 		});
// 	}

// })();
