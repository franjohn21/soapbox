var template = (function(){


	function addSplash(params){
		var compiled = _.template('<li id="<%= id %>" class="splash col-sm-12 col-md-12 col-lg-12 inline-list" style="<%= bgcolor %>"><div class="meta_splash"><span class="author_name"><%= name %></span><div id="splash-created-on"><%= time %></div></div><div class="splash_content"><%= content %></div><div class="icons clearfix"><span class="lower_left"><i class="fa fa-2x fa-bullhorn"></i></span><span class="lower_right"><span class="number"><%= count %></span><i class="fa fa-2x fa-star-o favorite <%=color%>"></span></i><div class="comment_container comment-<%=id%>-container"><form action="/splashes/<%=id%>/comment" method="post" class="submit_comment" id="submit_comment-<%=id%>"><input type="textarea" placeholder="Reply" rows="4" cols="10" name="content"><br><input type="submit" id="create_comment"><br></form><ul id="comment-<%=id%>" class="comment-list"><li></li><li role="presentation" class="divider"></li></ul></div></li>');
    string = compiled(params);
		return compiled(params);
	}

  function addModal(){
    var compiled = _.template('<div class="paulund_modal_box"><a href="#" class="paulund_modal_close"></a><div class="paulund_inner_modal_box"><form id="create-splash-form" action="/splashes" method="post"><label for="Create-Splash"><p>Splash!</p></label><br><textarea id="modal_content" rows="3" cols="53" name="content" maxlength="255"></textarea><div id="textarea_feedback"></div><br><input type="submit" id="create_splash"><br></form></div></div>');
    return compiled();
  }

  function addFooter(){
    var compiled = _.template('<footer ><div class="row"><div class="container-fluid"><div class="col-lg-12"><div class="row footer">// ©2014 Soapbox Limited // Jobs // Privacy // Press // Terms</div></div></div></div></footer>')
    return compiled();
  }
  function addComment(params){
    var compiled = _.template('<li role="presentation" class="divider"></li><li role="presentation"><%= name %></li><li role="presentation"><%= content %></li>');
      return compiled(params);
  }

  function addLogin(){
    var compiled = _.template('<div class="login"><img class="splash_img" src="../images/SoapSimple.svg" alt=""><h1>SoapBox</h1><p>Bridging the Gap in Communication</p><a href="/auth/facebook"><button type="button" class="regFnt btn btn-primary btn-lg">Login With Facebook</button></a><br></div>');
    return compiled();
  }

  function addHeader(){
    var compiled = _.template('<nav class="navbar navbar-inverse" role="navigation"><div class="row"><div class="col-md-4"><img class="logo" src="../images/SoapSimple.svg" alt=""><h3 class="logo_type">SoapBox</h3></div><div class="col-md-4"><a href="#" id="create_new_btn" class="paulund_modal"><img class="pulse new-splash-link" src="../images/bullhorn_Fotor.png"></img></a></div><div class="col-md-4"><ul><li class="logged-in-as">Logged in as: <span id="login_name"></span></li><li class="score" id="score"></li><li><a class="logout" href="/logout">Logout</a></li></ul></div></div></nav>');
    return compiled();
  }

  function addSplashContainer(){
    var compiled = _.template('<div class="container col-lg-offset-3 col-lg-6" id="main_content"><div class="row col-lg-12 "><div class="x-hidden col-sm-12  col-md-12 col-lg-12 "><ul id="splash_list" class="col-md-12 scrolly"></ul></div></div></div>');
    return compiled();
  }

  function addCreateSplashButton(){
    // var compiled = _.template('<div class="container"><div class="row"><a href="#" id="create_new_btn" class="paulund_modal col-md-8"><img class="col-md-offset-6 pulse" class="new-splash-link" src="../images/bullhorn_Fotor.png"></img></a></div></div>');
    // return compiled();
  }



  function addScore(params){
    var compiled = _.template('<%=score%>');
    return compiled(params);
  }

  function addDashboard(){
     // var compiled = _.template('<div class="container-fluid" id="dashboard"><div class="row"><div class="wild_card col-lg-12"></div></div></div>')
     // return compiled();
  }

  function addLoading(){
    var compiled = _.template('<div class="loading"><div class="container"><h1> SoapBox</h1><i id="spinner" class="fa fa-4x fa-spinner fa-spin"></i><button id="entersite" onclick="view.removeLoading();" class="btn" id="intro">Enter Site</button><br><h3 class="col-md-6 col-md-offset-3">It\'s simple. <br><br>1. Send messages to those within 1 km of you<br> 2. Receive messages from those same people. <br><br><br> SoapBox breaks the bounds of requiring prior contact information before interacting with those around you on the internet.</div>')
    return compiled();
  }

	return {
		addSplash: addSplash,
    addModal: addModal,
    addComment: addComment,
    addHeader: addHeader,
    addLogin: addLogin,
    addSplashContainer: addSplashContainer,
    addCreateSplashButton: addCreateSplashButton,
    addScore: addScore,
    addFooter: addFooter,
    addDashboard: addDashboard,
    addLoading: addLoading
  };
})();
