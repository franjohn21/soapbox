var view = (function(){
  var interval;
  var counter = 0;


  var addSplash = function(data, favorited, count){

    time = model.splashTime(data);
    if(favorited)
      color = "gold"
    else
      color = ""
    bgcolor = Please.make_color({
          greyscale: true, //for the brits
          grayscale: true  //for the yanks}));
      });
    var compiled_html = template.addSplash({id: data.id, name: data.author_name, content: data.content, time_ago: time, color: color, count: count, bgcolor: bgcolor });

    var $hopeThisWorks = $(compiled_html)

    if($('#splash_list li.splash').length > 0){
      // $('#splash_list li.splash:eq(0)').hide().before($hopeThisWorks).fadeIn(500)
        $($hopeThisWorks).hide().prependTo($('#splash_list')).fadeIn(2000)
    } else {
      // $('#splash_list').append($hopeThisWorks);
      // $hopeThisWorks.fadeIn(500)
        $($hopeThisWorks).hide().appendTo($('#splash_list')).fadeIn(2000)
    // $('#splash_list li.splash:eq(0)').css("background-color",Please.make_color());
    }
    view.addColors();

  };

  // var addAllSplashes = function(splashes_list){
  //   for(var i=0; i < splashes_list.length; i++)
  //   {
  //     var splash = splashes_list[i]
  //     var compiled_html = template.addSplash({id: splash.id, first: data["first_name"], last: data["last_name"], content: splash.content })
  //     $('#splash_list li:eq(0)').before(compiled_html);

  //   }
  // }
  var switchFavorite = function(data){
    if(data.favorited === true)
    {
      $("#"+data.splash_id+" .favorite").addClass("gold")
      curr = parseInt($('#'+data.splash_id +" .number").text())
      $('#'+data.splash_id +" .number").text(curr+1)
      val = parseInt($(".score").text().match(/\d/g)[0])
      $(".score").text("Score: "+ (parseInt(val+1)))
    }
    else
    {
      $("#"+data.splash_id+" .favorite").removeClass("gold")
      curr = parseInt($('#'+data.splash_id +" .number").text())
      $('#'+data.splash_id +" .number").text(curr-1)
      val = parseInt($(".score").text().match(/\d/g)[0])
      $(".score").text("Score: "+ (parseInt(val-1)))
    }
  }

  var addLogin = function(){
    $('body').html(template.addLogin());
  };

  var addHeader = function(){
    $('body').html(template.addHeader());
  };

  var addSplashContainer = function(){
     // ($(template.addSplashContainer())).after( $('nav') );
     $('body').append(template.addSplashContainer());
  };

  var addCreateSplashButton = function(){
    $('body').append(template.addCreateSplashButton());
  };

  var showComments = function(id){
    $('.comment-'+ id+'-container').slideToggle();
  };

  var addComment = function(data){

    var commentContent = data["content"];
    var compiled_html = template.addComment({name: data["author_name"], content: commentContent});
    $('#comment-'+data["splash_id"]).append(compiled_html);

  };

  var addScore = function(score){
    if ($(".score").length === 0)
    {
      $("#score").text(template.addScore({score: score}))
    }
    else
      $(".score").html("<li>Score: "+ score +"</li>")
  }

  var addHeader = function(){
    $('body').html(template.addHeader());
    // $('.container').before(template.addHeader());
  };

  var addLogin = function(){
    $('body').html(template.addLogin());
  };

  var stop = function(){
    clearInterval(interval);
  };

  var addColors = function(){
      $('#splash_list .splash').each(function(index,element){
       $(element).css("background-color",Please.make_color({
          greyscale: true, //for the brits
          grayscale: true  //for the yanks}));
      }));
    });
  }

  var moveRight = function(data){
    $('.fa-chevron-right').mouseleave(stop);
    interval = setInterval(function(){
      if(parseInt($("#splash_list").css("right")) > ($("#splash_list .splash").length-3) * $(".splash").width())
      return
      $("#splash_list").css("right",counter + "px");
      counter += 30;

    },50);
  };

  var moveLeft = function(data){
    $('.fa-chevron-left').mouseleave(stop);

    interval = setInterval(function(){
     if(parseInt($("#splash_list").css("right")) < 0 )
      return;
      $("#splash_list").css("right", counter + "px");
      counter -= 30;
    },50);
  };

  var addFooter = function(data){
    $('body').append(template.addFooter())
  }

  var addDashboard = function(data){
    //$('body').append(template.addDashboard())
  }

  var addLoading = function(){
    $('body').append(template.addLoading())
  }

  var removeLoading = function(){

    $('.loading').fadeOut("slow",function(){
    $("#main_content").addClass("slideRight");
      
      $('.loading').remove()
      $('#main_content').addClass("slideRight")
    });

  }

  var enterSite = function(){
    $("#spinner").fadeOut()
    $("#entersite").addClass("fadeIn")
    $("#entersite").show()
    $("#spinner").hide()

  }

  return{
    showComments: showComments,
    addSplash: addSplash,
    addComment: addComment,
    moveRight: moveRight,
    moveLeft: moveLeft,
    addColors: addColors,
    addHeader: addHeader,
    addLogin: addLogin,
    addSplashContainer: addSplashContainer,
    addCreateSplashButton: addCreateSplashButton,
    switchFavorite: switchFavorite,
    addScore: addScore,
    addFooter: addFooter,
    addDashboard: addDashboard,
    addLoading: addLoading,
    removeLoading: removeLoading,
    enterSite: enterSite
  };
})();
