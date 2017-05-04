$(document).ready(function() {
  var intro1 = $('.intro1');
  var intro2 = $('.intro2');
  var slide = $('.slide');
  var slider = $('.slider');
  var next = $('.next');
  var back = $('.back');
  var howManySlides = slide.length;
  whichSlide = 0;

  windowSize ();
  $(window).on('resize', function () {
    setTimeout(windowSize, 500);
  });

  function windowSize () {
    height = $(window).height();
    width = $(window).width();
    $('.wrapper').css('height', height).css('width', width);
    slider.css('height', height).css('width', width*howManySlides);
    intro1.css('height', (height/2)).css('width', (width));
    $('.intro-wrapper').css('height', (height/2)).css('width', (width));
    intro2.css('height', (height/2)).css('width', (width));
    slide.css('height', height).css('width', width);
    slider.css('margin-left', -(width*whichSlide));
  }

  next.on('click', function () {
    var margin = $(window).width();
    if (whichSlide === 0) {
      intro1.slideUp(1200);
      intro2.fadeOut(1200).promise().done(function () {
        slider.animate({marginLeft: -margin});
      });
      whichSlide = whichSlide+1;
      back.css('visibility', 'visible');
    }
    else if (whichSlide > 0 && whichSlide < howManySlides) {
      whichSlide = whichSlide + 1;
      slider.animate({marginLeft: -(whichSlide * margin)});
      if ((whichSlide + 1)===howManySlides){
        next.css('visibility', 'hidden');
      }
    }
  });

  back.on('click', function () {
    var margin = $(window).width();
    var realMargin = parseInt(slider.css('margin-left'));
    if(whichSlide === 1) {
      slider.animate({marginLeft: 0}).promise().done(function() {
        intro1.slideDown(1200);
        intro2.fadeIn(1200);
      });
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
  });



});
