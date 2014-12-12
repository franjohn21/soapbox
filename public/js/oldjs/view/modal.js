(function($){
    $.fn.paulund_modal_box = function(prop){

      var options = $.extend({
        height : "250",
        width : "500",
        top: "20%",
        left: "30%",
      },prop);

      return this.click(function(e){
        add_block_page();
        add_popup_box();
        add_styles();
        addRipples();

        $('.paulund_modal_box').fadeIn();
      });

       function add_styles(){
        $('.paulund_modal_box').css({
          'position':'absolute',
          'left':options.left,
          'top':options.top,
          'display':'none',
          'height': options.height + 'px',
          'width': options.width + 'px',
          'border':'1px solid grey',
          'box-shadow': '0px 2px 7px #292929',
          '-moz-box-shadow': '0px 2px 7px #292929',
          '-webkit-box-shadow': '0px 2px 7px #292929',
          'border-radius':'10px',
          '-moz-border-radius':'10px',
          '-webkit-border-radius':'10px',
          'background': 'grey',
          'z-index':'50',
        });
        $('.paulund_modal_close').css({
          'position':'relative',
          'top':'-25px',
          'left':'20px',
          'float':'right',
          'display':'block',
          'height':'50px',
          'width':'50px',
          'background': 'url(images/close.png) no-repeat',
        });

        var pageHeight = $(document).height();
        var pageWidth = $(window).width();

        $('.paulund_block_page').css({
          'position':'absolute',
          'top':'0',
          'left':'0',
          'background-image' : 'url(/images/modalbg.png)',
          'background-size' : '100%',
          'height':pageHeight,
          'width':pageWidth,
          'z-index':'10'
        });        
        $('.paulund_inner_modal_box').css({
          'background-color':'grey',
          'height':(options.height - 50) + 'px',
          'width':(options.width - 50) + 'px',
          'padding':'10px',
          'margin':'15px',
          '-moz-border-radius':'10px',
          '-webkit-border-radius':'10px', 
        });
        $('jquery-ripples').css({
          'position': 'relative; z-index: 0',
        })
      }

       function add_block_page(){
        var block_page = $('<div class="paulund_block_page"></div>');

        $(block_page).appendTo('body');
      }

       function add_popup_box(){
         var pop_up = template.addModal();
         $(pop_up).appendTo('.paulund_block_page');
         $('#modal_content').focus();
         controller.wordCount();

         $('.paulund_modal_close').click(function(){
          $(this).parent().fadeOut().remove();
          $('.paulund_block_page').fadeOut().remove();
         });
      }

      function addRipples(){
        $('.paulund_block_page').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        }); 
      }
      

      return this;
    };

})(jQuery);
