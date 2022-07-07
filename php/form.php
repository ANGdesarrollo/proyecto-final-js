<?php
$name = $_POST['name'];
$email = $_POST['email'];
$contact = $_POST['contact'];
$message = $_POST['message'];

$for = 'alexisgraff123@gmail.com';
$business = 'Form info';

mail($for, $business, utf8_decode($message. ','.$name. ','.$email. ','.$contact));

header("Location:../sections/success-form.html");

