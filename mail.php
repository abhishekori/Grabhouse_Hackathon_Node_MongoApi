<?php
echo "sending mail";
 $email='abhikori1994@gmail.com';
   $subject = "PRODUCTS OUT OF STOCK";
   $message='One or more products are out of stock:\n\n';
   
   mail($email, $subject, $message);

?>