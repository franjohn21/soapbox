define(['app'], function(){	
	window.fbAsyncInit = function() {
	       FB.init({
	         appId      : '707092289381408',
	         xfbml      : true,
	         version    : 'v2.1'
	       });
	     };

	     (function(d, s, id){
	        var js, fjs = d.getElementsByTagName(s)[0];
	        if (d.getElementById(id)) {return;}
	        js = d.createElement(s); js.id = id;
	        js.src = "/js/vendor/fb_sdk.js";
	        fjs.parentNode.insertBefore(js, fjs);
	      }(document, 'script', 'facebook-jssdk'));
})