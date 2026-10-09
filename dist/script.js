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
    $(".mobile-menu ul:not(.header-social)").toggleClass("open");
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

/*
 * Contact form — submitted to Netlify Forms in the background so the
 * visitor stays on the page and sees a thank-you message.
 */
(function () {
  var form = document.querySelector('form[name="contact"]');
  if (!form) return;

  var button = form.querySelector('.form-submit');
  var status = form.querySelector('.form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    button.disabled = true;
    status.textContent = 'Sending…';

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString()
    })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        form.reset();
        status.textContent = "Thanks! We got your message and will be in touch soon.";
      })
      .catch(function () {
        status.textContent = 'Sorry, something went wrong. Please try again in a moment.';
      })
      .then(function () {
        button.disabled = false;
      });
  });
})();

/*
 * Show calendar — loaded from the published "Barnacles Show Calendar"
 * Google Sheet (filled in by the "Add a Barnacles Show" Google Form).
 * Only upcoming shows are listed, soonest first. To change a show, edit
 * or delete its row in the Sheet; the site picks it up within ~5 minutes.
 */
(function () {
  var list = document.querySelector('.calendar-list[data-calendar-csv]');
  if (!list) return;

  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'];

  // Minimal CSV parser that handles quoted fields, commas and newlines.
  function parseCSV(text) {
    var rows = [], row = [], field = '', inQuotes = false;
    for (var i = 0; i < text.length; i++) {
      var c = text[i];
      if (inQuotes) {
        if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
        else if (c === '"') { inQuotes = false; }
        else { field += c; }
      } else if (c === '"') { inQuotes = true; }
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (c === '\r' && text[i + 1] === '\n') i++;
        row.push(field); rows.push(row); row = []; field = '';
      } else { field += c; }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }
    return rows;
  }

  // Accepts 10/18/2026 (US Sheets default) or 2026-10-18.
  function parseDate(value) {
    var m = String(value).trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (m) return new Date(+m[3], +m[1] - 1, +m[2]);
    m = String(value).trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (m) return new Date(+m[1], +m[2] - 1, +m[3]);
    return null;
  }

  // "6:00:00 PM", "6:30 PM" or "18:30:00" -> "6pm" / "6:30pm"
  function formatTime(value) {
    var m = String(value).trim().match(/^(\d{1,2}):(\d{2})(?::\d{2})?\s*([AaPp][Mm])?$/);
    if (!m) return String(value).trim();
    var h = +m[1], min = m[2], ampm = m[3] ? m[3].toLowerCase() : null;
    if (!ampm) { ampm = h >= 12 ? 'pm' : 'am'; h = h % 12 || 12; }
    return h + (min === '00' ? '' : ':' + min) + ampm;
  }

  function safeLink(value) {
    var url = String(value || '').trim();
    if (!url) return null;
    if (!/^https?:\/\//i.test(url)) url = 'https://' + url;
    return /^https?:\/\/[^\s]+\.[^\s]+$/i.test(url) ? url : null;
  }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  }

  function showMessage(text) {
    list.innerHTML = '';
    list.appendChild(el('p', 'calendar-message', text));
  }

  function render(shows) {
    list.innerHTML = '';
    shows.forEach(function (show) {
      var group = el('div', 'calendar-group');
      group.appendChild(el('h3', null, show.venue));

      var content = el('div', 'calendar-content');
      var info = el('div');
      info.appendChild(el('h4', null,
        MONTHS[show.date.getMonth()] + ' ' + show.date.getDate() + ', ' + show.date.getFullYear()));

      var details = [show.town];
      if (show.start) details.push(show.end ? show.start + ' - ' + show.end : show.start);
      info.appendChild(el('p', null, details.filter(Boolean).join(' • ')));
      content.appendChild(info);

      if (show.link) {
        var a = el('a', 'button', 'More Details');
        a.href = show.link;
        a.target = '_blank';
        a.rel = 'noopener';
        content.appendChild(a);
      }

      group.appendChild(content);
      list.appendChild(group);
    });
  }

  fetch(list.getAttribute('data-calendar-csv'), { cache: 'no-store' })
    .then(function (res) {
      if (!res.ok) throw new Error(res.status);
      return res.text();
    })
    .then(function (text) {
      var rows = parseCSV(text);
      var header = (rows.shift() || []).map(function (h) { return h.trim().toLowerCase(); });
      var col = function (name) { return header.indexOf(name); };
      var c = {
        venue: col('venue'), date: col('date'), town: col('town'),
        start: col('start time'), end: col('end time'), link: col('details link')
      };

      var today = new Date();
      today.setHours(0, 0, 0, 0);

      var shows = rows.map(function (r) {
        var get = function (i) { return i >= 0 && r[i] ? r[i].trim() : ''; };
        return {
          venue: get(c.venue),
          date: parseDate(get(c.date)),
          town: get(c.town),
          start: get(c.start) ? formatTime(get(c.start)) : '',
          end: get(c.end) ? formatTime(get(c.end)) : '',
          link: safeLink(get(c.link))
        };
      }).filter(function (s) {
        return s.venue && s.date && s.date >= today;
      }).sort(function (a, b) {
        return a.date - b.date;
      });

      if (shows.length) render(shows);
      else showMessage('No upcoming shows right now. Check back soon!');
    })
    .catch(function () {
      showMessage("We couldn't load the show calendar right now. Please check back soon!");
    });
})();

/* Keep the footer copyright year current. */
document.querySelectorAll('.current-year').forEach(function (el) {
  el.textContent = new Date().getFullYear();
});
