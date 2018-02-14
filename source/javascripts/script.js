function highlightButtonOnDropdownActive() {
  var activeClass = 'header__nav-item--active';
  var dropdownButtonSelector = '.header__nav-item--dropdownButton'

  $(dropdownButtonSelector).on('mouseenter', function(){
    $(this).addClass(activeClass);
  });

  $('.header__nav-item:not(' + dropdownButtonSelector + ')').on('mouseenter', function(){
    $(dropdownButtonSelector).removeClass(activeClass);
  });

  $('.dropdown').on('mouseleave', function() {
    $(dropdownButtonSelector).removeClass(activeClass);
  });
}

$(document).ready(function() {
  $('.main').addClass('fadeIn');
});

$(document).ready(function(){
    $(".mobileNav").click(function(){
        $(".mobileNav__nav").slideToggle();
    });
});

function highlightNavigationLinks() {

  $('.header__nav-item a').on('click', function() {
    var navigationLinks = $('.header__nav-item');
    navigationLinks.each(function(index, item) {
      $(item).removeClass('header__nav-item--active');
    })

    $(this).parent().addClass('header__nav-item--active');
  })

  $(document).on('scroll', function() {
    var navigationLinks = $('.header__nav-item a');
    var navigationElementHeight = $('.header__nav').height();
    var fromTop = $(this).scrollTop()
    var currentSection;

    $('.section').each(function(){
      var sectionOffset = $(this).offset().top;

      if (sectionOffset - 1 < fromTop + navigationElementHeight) {
        currentSection = $(this)
      }

      function isLastSection() {
        return ($(window).scrollTop() >= $(document).height() - $(window).height())
      }

      var id = isLastSection() ? 'contact' : currentSection.attr('id');

      navigationLinks.each(function(index, item) {
        $(item).parent().removeClass('header__nav-item--active');
      })

      navigationLinks.each(function(index, item) {
        if ($(this).data('scroll-to') === id) {
          $(item).parent().addClass('header__nav-item--active');
        }
      })
    })
  })
}

function animateScrollToSection() {
  var callback = function() {
    console.log('koniec animacji')
  }

  $('.header__nav-item a').on('click', function() {
    var navigationBarHeight = $('.header__nav').height();
    var scrollOffset = $('#' + this.dataset.scrollTo).offset().top - navigationBarHeight;

    $('body, html').animate({'scrollTop': scrollOffset}, 500, 'swing', callback);
  })
}

function initMap() {
  var markerPosition = {lat: 53.4387859, lng: 14.562607299999968};
  var mapCenterPosition = {lat: 53.4387859, lng: 14.5648};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 17,
    center: mapCenterPosition,
    clickableIcons: false,
    disableDefaultUI: true,
    disableDoubleClickZoom: true,
    draggable: false,
    fullscreenControl: false,
    fullscreenControlOptions: false,
    keyboardShortcuts: false,
    gestureHandling: 'none',
    draggableCursor: 'default'

  });
  var marker = new google.maps.Marker({
    position: markerPosition,
    map: map
  });
}

function getDataFromAPI() {
  $('#dataButton').on('click', function(){

    $(this).text('loading...').css({'opacity': '0.5', 'pointer-events': 'none'})

    $.ajax({
      url: 'http://5a74c66b08118e0012fd4c9a.mockapi.io/raku/cars',
      data: {},
      type: 'GET',
      success: function(data) {
        onRequestSuccess(data)
        $('#dataButton').text('button').css({'opacity': '1', 'pointer-events': 'initial'})
      },
      error: function(JqXHR, textStatus, errorThrown) {
        onRequestError(errorThrown);
        $('#dataButton').text('button').css({'opacity': '1', 'pointer-events': 'initial'})
      }
    })
  })
}

function onRequestError(error) {
  alert(error)
}

function onRequestSuccess(data) {
  $('#dataItems').html('');
  $.each(data, function(index, car) {
    var itemTemplate = '<div>Model: ' + car.model + '<br/>Engine: ' + car.engine + '<br/><br/></div>';
    $('#dataItems').append(itemTemplate);
  })
}

$(document).ready(function(){
  highlightButtonOnDropdownActive();
  animateScrollToSection();
  highlightNavigationLinks();
  getDataFromAPI();
});


