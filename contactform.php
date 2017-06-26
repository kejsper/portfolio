<?php
sendEmail();

function sendEmail() {
  //sanitizing input fields
  $firstName = filter_var($_POST['firstName'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);
  $lang = filter_var($_POST['lang'], FILTER_SANITIZE_STRING);
  //checking if there is language set already
  if(isset($lang)) {
    // settings for PL
    if ($lang==='pl') {
      $lang = 'pl';
    }
    //setting for EN
    elseif ($lang==='en'){
      $lang = 'en';
    }
    //setting for anything else in POST method
    else {
      $lang = 'pl';
    }
  } else {
    // checking user language and setting page language
    $lang = 'pl';
  }

  //checking required fields
  if(!empty($firstName) && !empty($email) && !empty($message)) {
    // email validation
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
      //fail to validate email
      if ($lang==='pl') {
        ?>
        <h1 class="message-header">Błąd</h1>
        <h3 class="message-subheader">Adres email jest niepoprawny</h3>
        <p class="message-paragraph">Spróbuj ponownie.</p>
        <?php
      } else {
        ?>
        <h1 class="message-header">Error</h1>
        <h3 class="message-subheader">Email address is incorrect.</h3>
        <p class="message-paragraph">Please try again.</p>
        <?php
      }
    }
    else {
      //setting up email data
      $sendToEmail = 'kacper.tylenda@gmail.com';
      $subject = 'Wiadomość wysłana z formularza portfolio';
      $body = '<h1>Wiadomość od: '.$firstName.' </h1><h3>Z adresu email: '.$email.' </h3><p>O treści:</p><p>'.$message.'</p>';
      $headers = "MIME-Version: 1.0"."\r\n";
      $headers .= "Content-Type:text/html; charset=UTF-8" . "\r\n";
      $headers .= "From: " . $firstName . "<" . $email . ">" . "\r\n";

      if(mail($sendToEmail, $subject, $body, $headers)) {
        if ($lang==='pl') {
          ?>
          <h1 class="message-header">Dziękuję</h1>
          <h3 class="message-subheader">Email został wysłany</h3>
          <p class="message-paragraph">Wkrótce otrzymasz ode mnie odpowiedź.</p>
          <?php
        } else {
          ?>
          <h1 class="message-header">Thank You</h1>
          <h3 class="message-subheader">Email has been sent</h3>
          <p class="message-paragraph">I will get back to you as soon as possible.</p>
          <?php
        }
      }
      else {
        //fail to send email
        if ($lang === 'pl') {
          ?>
          <h1 class="message-header">Błąd</h1>
          <h3 class="message-subheader">Email nie został wysłany</h3>
          <p class="message-paragraph">Spróbuj ponownie.</p>
          <?php
        } else {
          ?>
          <h1 class="message-header">Error</h1>
          <h3 class="message-subheader">Fail attempt to send an email.</h3>
          <p class="message-paragraph">Please try again.</p>
          <?php
        }
      }
    }
  }
  else {
    if ($lang === 'pl') {
      ?>
      <h1 class="message-header">Błąd</h1>
      <h3 class="message-subheader">Wypełnij wymagane pola.</h3>
      <p class="message-paragraph">Spróbuj ponownie.</p>
      <?php
    } else {
      ?>
      <h1 class="message-header">Error</h1>
      <h3 class="message-subheader">Please fill all the required fields</h3>
      <p class="message-paragraph">Please try again.</p>
      <?php
    }
  }
}
?>
