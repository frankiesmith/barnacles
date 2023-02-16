jQuery(document).ready(function($) {
    $window = $(window);

    $('*[data-type="parallax"]').each(function(){

        var $bgobj = $(this);

        $(window).scroll(function() {

            var yPos = -($window.scrollTop() / $bgobj.data('speed'));

    var coords = '50% '+ yPos + 'px';

            $bgobj.css({ backgroundPosition: coords });

        });
    });
  
  $('header').on('click','a',function(e){
  if(e.target.href.indexOf('#') !== -1 ){
    e.preventDefault();
    $('html,body').animate(
      {scrollTop: $('#'+e.target.href.split('#')[1]).offset().top -110},
      300
    );
  }
  return true;
		});
  
  function toggleTopBar() {
  viewportHeight = $( window ).height() -153;
if ($(this).scrollTop() > viewportHeight) {
    $(".logo").addClass('shrink');
    $("nav").addClass('raise');
    $("main").addClass('raise');
    $(".blank-item").removeClass('bigger');
  } else {
    $(".logo").removeClass('shrink');
    $("nav").removeClass('raise');
    $("main").removeClass('raise');
    $(".blank-item").addClass('bigger');
  }
}

$(window).scroll( toggleTopBar );

$(toggleTopBar);
  
  function removeActive() {
  viewportHeight = $( window ).height() -160;
if ($(this).scrollTop() < viewportHeight) {
    $(".linked a").removeClass('active');
  } else {
  }
}

$(window).scroll( removeActive );

$(removeActive);

  });

(function ($, window, document, undefined) {
    "use strict";

    var ClassScrollOpacityEffect,
        defaults = {
            endPoint: 500,
            opacity: 1,
            opacityDivisor: 1000,
            transformDivisor: 7
        };

    ClassScrollOpacityEffect = function (triggerHolder, options) {
        return {
            init: function () {
                this.settings = $.extend({}, defaults, options);
                this._effect(triggerHolder,this.settings)
            },
            _effect: function(holder,settings) {
                $(window).scroll(function(){
                    var scrollTop = $(window).scrollTop();

                    if (scrollTop < settings.endPoint) {
                        holder.css('opacity', settings.opacity-scrollTop/settings.opacityDivisor);
                        holder.css({
                            '-webkit-transform' : 'translateY(' + scrollTop/settings.transformDivisor + '%)',
                            '-ms-transform' : 'translateY(' + scrollTop/settings.transformDivisor + '%)',
                            transform : 'translateY(' + scrollTop/settings.transformDivisor + '%)'
                        });
                    }
                });
            }
        };
    };

    ClassScrollOpacityEffect.defaults = defaults;
    $.fn.scrollOpacityEffect = function (options) {
        return new ClassScrollOpacityEffect(this, options).init();
    };

    return ClassScrollOpacityEffect;
})(jQuery, window, document);

(function($){
    $(".opacity-change").scrollOpacityEffect({
      opacity: 1,
      opacityDivisor: 200,
    });
})(jQuery);

$(window).scroll(function() {
		var scrollDistance = $(window).scrollTop() +110
	
		// Assign active class to nav links while scolling
		$('.nav-section').each(function(i) {
				if ($(this).position().top <= scrollDistance) {
						$('.linked a.active').removeClass('active');
						$('.linked a').eq(i).addClass('active');
				}
		});
}).scroll();


//Fade In Up Animation

(function() {
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll('.fade-in-up');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= -50) {
        element.classList.add('fade-in-up-element');
        element.classList.remove('fade-in-up');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
})();