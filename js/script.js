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
  swipeForMobile()

  //controls window size and adjust page to window
  $(window).on('resize', function () {
    windowSize();
  });

  // setting div sizes according to window size
  function windowSize () {
    height = $(window).height();
    width = window.outerWidth;
    // iOS fix for outerWidth bug
    if (width===0) {
      width = document.body.getBoundingClientRect().width;
    }
    $('.wrapper').css('height', height).css('width', width);
    slider.css('height', height).css('width', width*howManySlides);
    intro1.css('height', height).css('width', width);
    $('.intro-wrapper').css('height', height).css('width', width);
    slide.css('height', height).css('width', width).css('left', (-width));
    $('.slide-main').css('height', height).css('width', width);
    if (whichSlide > 1) {
      slider.css('margin-left', -(width*(whichSlide-1)));
    }
    overflow(height);

  }

  // checks if overflow-y is needed for the slide
  function overflow(height) {
    if (slide1height>height) {
      $('#slide1').addClass('overflow-y');
    } else {
      $('#slide1').removeClass('overflow-y');
    }
    if (slide2height>height) {
      $('#slide2').addClass('overflow-y');
    } else {
      $('#slide2').removeClass('overflow-y');
    }
    if (slide3height>height) {
      $('#slide3').addClass('overflow-y');
    } else {
      $('#slide3').removeClass('overflow-y');
    }
  }

  //swiping slides for mobile devices
  function swipeForMobile() {
    if ('ontouchstart' in window) {
      $(window).swipe({
        swipeLeft: function(event, direction, distance, duration, fingerCount, fingerData) {
          changeSlideNext();
        },
        swipeRight: function(event, direction, distance, duration, fingerCount, fingerData) {
          changeSlideBack();
        }
      });
    }
  }

  // next button navigation
  next.on('click', function () {
    changeSlideNext();
  });

  function changeSlideNext() {
    var margin = $(window).width();
    if (whichSlide === 0) {
      intro1.slideUp(1200).promise().done(function() {
        $('#slide0').css('z-index', '-1');
      });
      whichSlide = whichSlide+1;
      back.css('visibility', 'visible');
    }
    else if (whichSlide > 0 && whichSlide < howManySlides) {
      slider.animate({marginLeft: -(whichSlide * margin)});
      whichSlide = whichSlide + 1;
      if ((whichSlide + 1)===howManySlides){
        next.css('visibility', 'hidden');
      }
    }
    editNav(whichSlide);
  }

  // back button navigation
  back.on('click', function () {
    changeSlideBack()
  });

  function changeSlideBack() {
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
  }

  editNav(whichSlide);

  // Function that changes navigation headers
  function editNav(whichSlide) {
    switch (whichSlide) {
      case 0:
        $('.nav-descr').css('display', 'none');
        break;
      case 1:
        $('.nav-descr').css('display', 'none');
        $('.nav-hello').css('display', 'inline-block');
        $('.nav-next-mywork').css('display', 'inline-block');
        break;
      case 2:
        $('.nav-descr').css('display', 'none');
        $('.nav-skills').css('display', 'inline-block');
        $('.nav-next-contact').css('display', 'inline-block');
        break;
      case 3:
        $('.nav-descr').css('display', 'none');
        $('.nav-mywork').css('display', 'inline-block');
    }
  }

  // Function that change displayed skills
  $('.skill-icon').on('click', function() {
    clickedIcon = $(this).attr('id');
    $('.skill-description-container').find('.active').finish().fadeOut(1).removeClass('active');
    $('.skill-description-'+clickedIcon).fadeIn(700).addClass('active');
  });

  // function that validates form

  $('#send-email').on('submit', function(e) {
    e.preventDefault();

    //clearing alerts
    $('.alert-name').fadeOut(1);
    $('.alert-email').fadeOut(1);
    $('.alert-message').fadeOut(1);

    // getting values from form
    var form = $(this);
    firstName = $("input[name='firstName']").val();
    email = $("input[name='email']").val();
    message = $("textarea[name='message']").val();
    lang = $("input[name='lang']").val();

    // validating form data
    var reg = /^[a-z\d]+[\w\d.-]*@(?:[a-z\d]+[a-z\d-]+\.){1,5}[a-z]{2,6}$/i;
    if ( (firstName==='') || (message==='') || (reg.test(email) === false)) {
      if (firstName === '') {
        $('.alert-name').fadeIn(300);
      }
      if (reg.test(email) === false) {
        $('.alert-email').fadeIn(300);
      }
      if (message === '') {
        $('.alert-message').fadeIn(300);
      }
      return;
    }


    // starting ajax
    $.ajax(
      {
      url: 'contactform.php',
      type: 'post',
      data: {
        firstName,
        email,
        message,
        lang
      },
      error: function( response ) {
        console.log(response);
      },
      success: function (response) {
        $('.modal-background').css('display', 'flex').hide().fadeIn(500);
        $('.response').html(response);
      }
      });
  });

  $('.modal-close').on('click', function() {
    $('.modal-background').fadeOut(500);
  });

  $('.modal-background').on('click', function(e) {
    if(e.target===e.currentTarget) {
      $('.modal-background').fadeOut(500);
    }
  });



});
