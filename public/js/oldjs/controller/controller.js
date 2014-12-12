var controller = (function(){
  var latitude;
  var longitude;
  var base_url = "http://localhost:3000"
  var currUser;

  function getSplashes(){
    $.ajax({
      url: base_url+'/splashes',
      type: 'GET'
    }).done(model.addSplashes);
  }

  function getComments(){
    splashesArr = model.getSplashes();
    for(i = 0; i < splashesArr.length; i++)
    {
      id = splashesArr[i]
    $.ajax({
      url: base_url+'/splashes/'+id+'/comments',
      type: 'GET'
    }).done(view.addComment);
    }
  }

  function createSplash(evt){
    evt.preventDefault();
    var data = $('#create-splash-form').serialize();
    $.ajax({
      url: base_url+'/splashes',
      type: 'POST',
      data: data
    }).done(addSplash);
    $('.paulund_block_page').fadeOut().remove();
  }

  function addSplash(data){
    view.addSplash(data.splashes, false, data.count)
  }

  function showComments(evt){
    view.showComments($(this).closest('.splash')[0].id);
  }


  // Might work; need to test after log-in capability returned
  function createComment(evt){
    evt.preventDefault();
    id = $(this).closest('.splash')[0].id;
    var data = $(this).serialize();
    // data.user_id = localStorage.getItem("user_id")
    $.ajax({
      url: base_url+'/splashes/'+id+'/comment',
      type: 'POST',
      data: data
    }).done(view.addComment);
    $(this)[0].elements.content.value = "";
  }


  function poll() {

    timeout = setTimeout(function () {
      $.ajax({
        url: base_url+'/splashes',
        dataType: "json",
        data: {lat: latitude, lon: longitude},

          // user_id: localStorage.getItem("user_id")},
        statusCode:{
          401: function(){}
        },
      }).done(function(data){
        model.addSplashes(data);
        poll();
      });
    }, 2000);
  }

  function updateCoords(lat, lon){
    latitude = lat;
    longitude = lon;
  }

  function getUser(){
    $.ajax({
      url: '/user'
    }).done(function(data){
      $("#login_name").text(data.first_name + " " + data.last_name);
    });

  }

  function addBodyRipples(){
    $('body').ripples({
      resolution: 512,
      dropRadius: 20,
      perturbance: 0.04,
    });
  }

  function buildLoginPage() {
    view.addLogin();
  }

  function buildIndexPage() {
    view.addHeader();
    view.addCreateSplashButton();
    view.addSplashContainer();
    view.addDashboard();
    view.addFooter();
    view.addLoading();

    // loop through the splashes that should be displayed and 'createSplash' for each
    getSplashes();
    // same for comments ('createComment')
    getComments();
    $('.paulund_modal').paulund_modal_box();
    getUser();
    addBodyRipples();
  }

  function wordCount(){
    var text_max = 255;
    $('#textarea_feedback').text(text_max + ' characters remaining');

    $('body').keyup('#modal_content',function() {
      if ($('#modal_content').val())
      {
        var text_length = $('#modal_content').val().length;
        var text_remaining = text_max - text_length;
        $('#textarea_feedback').text(text_remaining + ' characters remaining');
      }
    });
  }

  function switchFavorite(data){
    id = $(this).closest('.splash')[0].id
    $.ajax({
      url: '/splashes/'+id+'/favorite'
    }).done(view.switchFavorite)
  }

  function bindEvents(){
   if($('#indexpage').length === 1){
      buildIndexPage();
    }
    else {
     buildLoginPage();
   };
    poll();
    geolocation.getLocation();
    $('body').on('click','.favorite', switchFavorite);
    $('body').on('submit', '.submit_comment', createComment);
    $('body').on('click','.fa-bullhorn', showComments);
    $('body').on('submit','#create-splash-form', createSplash);
    $('.fa-chevron-right').mouseenter(view.moveRight);
    $('.fa-chevron-left').mouseenter(view.moveLeft);
  }

  return{
    createSplash: createSplash,
    createComment: createComment,
    poll: poll,
    bindEvents: bindEvents,
    updateCoords: updateCoords,
    wordCount: wordCount,
    switchFavorite: switchFavorite,
    getComments: getComments,
    addBodyRipples: addBodyRipples
  };
})();

