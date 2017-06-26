<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Kacper Tylenda - Portfolio</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />

  <!-- inject:css -->
  <link rel="stylesheet" href="css/dist/styles-b46a48bc15.css">
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
        include 'content_pl.php';
      }
    } else {
      // checking user language and setting page language
      include 'content_pl.php';
    }
  ?>


  <!-- scripts needed to run the site -->
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/jquery.touchswipe/1.6.18/jquery.touchSwipe.min.js"></script>

  <!-- inject:js -->
  <script src="js/dist/script-6f6017b1b0.js"></script>
  <!-- endinject -->
  <!-- list of scripts ends here -->
</body>
</html>
