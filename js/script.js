$(document).ready(function() {
  var intro1 = $('.intro1');
  var intro2 = $('.intro2');
  var slide = $('.slide');
  var slider = $('.slider');
  var slide0height = $('#slide0').height();
  var slide1height = $('#slide1').height();
  var slide2height = $('#slide2').height();
  var slide3height = $('#slide3').height();
  var next = $('.next');
  var back = $('.back');
  var howManySlides = slide.length + 1;
  whichSlide = 0;

  windowSize ();
  $(window).on('resize', function () {
    setTimeout(windowSize, 500);
  });

  function windowSize () {
    height = $(window).height();
    width = $(window).outerWidth(true);
    $('.wrapper').css('height', height).css('width', width);
    slider.css('height', height).css('width', width*howManySlides);
    intro1.css('height', height).css('width', width);
    $('.intro-wrapper').css('height', height).css('width', width);
    slide.css('height', height).css('width', width).css('left', (-width));
    $('.slide-main').css('height', height).css('width', width);
    if (whichSlide > 1) {
      slider.css('margin-left', -(width*(whichSlide-1)));
    }
    if (whichSlide!==0) {
      if (slide1height>height) {
        $('#slide1').addClass('overflow-y');
      }
      if (slide2height>height) {
        $('#slide2').addClass('overflow-y');
      }
      if (slide3height>height) {
        $('#slide3').addClass('overflow-y');
      }
    }
  }

  next.on('click', function () {
    var margin = $(window).width();
    if (whichSlide === 0) {
      intro1.slideUp(1200).promise().done(function() {
        $('#slide0').css('z-index', '-1');
      });

      whichSlide = whichSlide+1;
      windowSize();
      back.css('visibility', 'visible');
    }
    else if (whichSlide > 0 && whichSlide < howManySlides) {
      slider.animate({marginLeft: -(whichSlide * margin)});
      whichSlide = whichSlide + 1;
      windowSize();
      if ((whichSlide + 1)===howManySlides){
        next.css('visibility', 'hidden');
      }
    }
    editNav(whichSlide);
  });

  back.on('click', function () {
    var margin = $(window).width();
    var realMargin = parseInt(slider.css('margin-left'));
    if(whichSlide === 1) {
      $('#slide0').css('z-index', '5');
      intro1.slideDown(1200);
      whichSlide = whichSlide - 1;
      back.css('visibility', 'hidden');
    }
    else if (whichSlide > 1) {
      whichSlide = whichSlide - 1;
      slider.animate({marginLeft: (realMargin+margin)});
      if ((whichSlide + 1) < howManySlides){
        next.css('visibility', 'visible');
      }
    }
    editNav(whichSlide);
  });

  function editNav(whichSlide) {
    switch (whichSlide) {
      case 1:
        $('#nav-back').html('powitanie');
        $('#nav-next').html('moje prace');
        break;
      case 2:
        $('#nav-back').html('umiejętności');
        $('#nav-next').html('kontakt');
        break;
      case 3:
        $('#nav-back').html('moje prace');
    }
  }
});
