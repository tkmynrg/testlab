<?php 

$mail = new PHPMailer(true); 

$message = 'Отправлено'

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response)

?>