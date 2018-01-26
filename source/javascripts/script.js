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

$(document).ready(function(){
  highlightButtonOnDropdownActive();
});

$(document).ready(function() {
  $('.main').addClass('fadeIn');
});

$(document).ready(function(){
    $(".mobileNav").click(function(){
        $(".mobileNav__nav").slideToggle();
    });
});

function initMap() {
  var uluru = {lat: 53.4387859, lng: 14.562607299999968};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}