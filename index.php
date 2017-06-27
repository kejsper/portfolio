<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <meta property="og:title" content="Kacper Tylenda" />
  <meta property="og:url" content="http://tylendaweb.com" />
  <meta property="og:description" content="My portfolio page" />
  <meta property="og:image" content="http://tylendaweb.com/img/welcome-pic.jpg" />
  <title>Kacper Tylenda - Portfolio</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />

  <!-- inject:css -->
  <link rel="stylesheet" href="css/dist/styles-b1ed228c58.css">
  <!-- endinject -->

</head>
<body>
  <?php
    //checking if there is language set already
    if(isset($_GET['lang'])) {
      $lang = filter_var($_GET['lang'], FILTER_SANITIZE_STRING);
      // settings for PL
      if ($lang==='pl') {
        include 'content_pl.php';
      }
      //setting for EN
      elseif ($lang==='en'){
        include 'content_en.php';
      }
      //setting for anything else in GET method
      else {
        include 'content_en.php';
      }
    } else {
      // checking user language and setting page language
      $localization = Locale::acceptFromHttp($_SERVER['HTTP_ACCEPT_LANGUAGE']);
      if ($localization === 'pl_PL') {
        include 'content_pl.php';
      }
      else {
        include 'content_en.php';
      }
    }
  ?>


  <!-- scripts needed to run the site -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js"></script>

  <!-- inject:js -->
  <script src="js/dist/script-a53741327d.js"></script>
  <!-- endinject -->

  <script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-101751691-1', 'auto');
    ga('send', 'pageview');
  </script>
  <!-- list of scripts ends here -->
</body>
</html>
