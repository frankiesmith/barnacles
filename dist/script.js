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

function updateMenuButton() {
  $('.js-menu-button').find('.menu-icon').toggleClass('is-active');
}

$(document).ready(function() {

  $('.js-menu-button').click(function(e){

    e.preventDefault();
    updateMenuButton();

  });

});

//Mobile Menu

  $(".menu-button").on('click', function() {
    $(".mobile-menu ul").toggleClass("open");
  });

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

$(window).scroll(function() {
    var scrollDistance = $(window).scrollTop() +110
  
    // Assign active class to nav links while scolling
    $('.nav-section').each(function(i) {
        if ($(this).position().top <= scrollDistance) {
            $('.mobile-menu .linked a.active').removeClass('active');
            $('.mobile-menu .linked a').eq(i).addClass('active');
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

addEvent(window, 'load', initForm);

var highlight_array = new Array();

function initForm(){
  initializeFocus();
  var activeForm = document.getElementsByTagName('form')[0];
  addEvent(activeForm, 'submit', disableSubmitButton);
  ifInstructs();
  showRangeCounters();
}

function disableSubmitButton() {
  document.getElementById('saveForm').disabled = true;
}

// for radio and checkboxes, they have to be cleared manually, so they are added to the
// global array highlight_array so we dont have to loop through the dom every time.
function initializeFocus(){
  var fields = getElementsByClassName(document, "*", "field");
  
  for(i = 0; i < fields.length; i++) {
    if(fields[i].type == 'radio' || fields[i].type == 'checkbox') {
      fields[i].onclick = function() {highlight(this, 4);};
      fields[i].onfocus = function() {highlight(this, 4);};
    }
    else if(fields[i].className.match('addr') || fields[i].className.match('other')) {
      fields[i].onfocus = function(){highlight(this, 3);};
    }
    else {
      fields[i].onfocus = function(){highlight(this, 2); };
    }
  }
}

function highlight(el, depth){
  if(depth == 2){var fieldContainer = el.parentNode.parentNode;}
  if(depth == 3){var fieldContainer = el.parentNode.parentNode.parentNode;}
  if(depth == 4){var fieldContainer = el.parentNode.parentNode.parentNode.parentNode;}
  
  addClassName(fieldContainer, 'focused', true);
  var focusedFields = getElementsByClassName(document, "*", "focused");
  
  for(i = 0; i < focusedFields.length; i++) {
    if(focusedFields[i] != fieldContainer){
      removeClassName(focusedFields[i], 'focused');
    }
  }
}

function ifInstructs(){
  var container = document.getElementById('public');
  if(container){
    removeClassName(container,'noI');
    var instructs = getElementsByClassName(document,"*","instruct");
    if(instructs == ''){
      addClassName(container,'noI',true);
    }
    if(container.offsetWidth <= 450){
      addClassName(container,'altInstruct',true);
    }
  }
}

function showRangeCounters(){
  counters = getElementsByClassName(document, "em", "currently");
  for(i = 0; i < counters.length; i++) {
    counters[i].style.display = 'inline';
  }
}

function validateRange(ColumnId, RangeType) {
  if(document.getElementById('rangeUsedMsg'+ColumnId)) {
    var field;
    if (document.getElementById('Field'+ColumnId)) {
      field = document.getElementById('Field'+ColumnId);
    } else if (document.getElementById('Field'+ColumnId+'_other')) {
      field = document.getElementById('Field'+ColumnId+'_other');
    }
    var msg = document.getElementById('rangeUsedMsg'+ColumnId);

    switch(RangeType) {
      case 'character':
        msg.innerHTML = field.value.length;
        break;
        
      case 'word':
        var val = field.value;
        val = val.replace(/\n/g, " ");
        var words = val.split(" ");
        var used = 0;
        for(i =0; i < words.length; i++) {
          if(words[i].replace(/\s+$/,"") != "") used++;
        }
        msg.innerHTML = used;
        break;
        
      case 'digit':
        msg.innerHTML = field.value.length;
        break;
    }
  }
}

function handleRadioOther(id, last) {
  var label = document.getElementById(id+'_otherlabel');
  if (label) {
    if (last) {
      label.style.display = 'block';
    } else {
      label.style.display = 'none';
    }
  }
}

/*--------------------------------------------------------------------------*/

//http://www.robertnyman.com/2005/11/07/the-ultimate-getelementsbyclassname/
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/\-/g, "\\-");
  var oRegExp = new RegExp("(^|\\s)" + strClassName + "(\\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];    
    if(oRegExp.test(oElement.className)){
      arrReturnElements.push(oElement);
    } 
  }
  return (arrReturnElements)
}

//http://www.bigbold.com/snippets/posts/show/2630
function addClassName(objElement, strClass, blnMayAlreadyExist){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      if ( blnMayAlreadyExist ){
         var strClassUpper = strClass.toUpperCase();
         for ( var i = 0; i < arrList.length; i++ ){
            if ( arrList[i].toUpperCase() == strClassUpper ){
               arrList.splice(i, 1);
               i--;
             }
           }
      }
      arrList[arrList.length] = strClass;
      objElement.className = arrList.join(' ');
   }
   else{  
      objElement.className = strClass;
      }
}

//http://www.bigbold.com/snippets/posts/show/2630
function removeClassName(objElement, strClass){
   if ( objElement.className ){
      var arrList = objElement.className.split(' ');
      var strClassUpper = strClass.toUpperCase();
      for ( var i = 0; i < arrList.length; i++ ){
         if ( arrList[i].toUpperCase() == strClassUpper ){
            arrList.splice(i, 1);
            i--;
         }
      }
      objElement.className = arrList.join(' ');
   }
}

//http://ejohn.org/projects/flexible-javascript-events/
function addEvent( obj, type, fn ) {
  if ( obj.attachEvent ) {
    obj["e"+type+fn] = fn;
    obj[type+fn] = function() { obj["e"+type+fn]( window.event ) };
    obj.attachEvent( "on"+type, obj[type+fn] );
  } 
  else{
    obj.addEventListener( type, fn, false );  
  }
}
