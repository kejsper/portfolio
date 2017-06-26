<?php
sendEmail();

function sendEmail() {
  //sanitizing input fields
  $firstName = filter_var($_POST['firstName'], FILTER_SANITIZE_STRING);
  $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
  $message = filter_var($_POST['message'], FILTER_SANITIZE_STRING);

  //checking required fields
  if(!empty($firstName) && !empty($email) && !empty($message)) {
    // email validation
    if(filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
      //fail to validate email
      echo "Adres email jest niepoprawny";
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
        echo "Email zostal wyslany";
      }
      else {
        //fail to send email
        echo "Email nie zostal wyslany";
      }
    }
  }
  else {
    echo "wypełnij wymagane pola.";
  }
}
?>
