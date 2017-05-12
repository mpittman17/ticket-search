<?php
// filename: getUser.php
// some PHP
	session_start();
    $user = array(
        'email_address' => $_SESSION['user_email'],
        'consumer_key' => $_SESSION['consumer_key'],
		'consumer_secret' => $_SESSION['consumer_secret'],
     );
    echo json_encode($user);
?>