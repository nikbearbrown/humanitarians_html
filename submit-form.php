<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $industry = $_POST['industry'];
    $message = $_POST['message'];

    $apiKey = 'pk_82395806_S0PDCEA6EM6MHB9C8Q45CUCZ68YGDAMK';
    $listId = '901404050763';
    
    $task_data = array(
        'name' => 'Contact from ' . $name,
        'description' => "Email: $email\nPhone: $phone\nIndustry: $industry\nMessage: $message",
        'status' => 'done'
    );


    $ch = curl_init();
    
    curl_setopt($ch, CURLOPT_URL, 'https://api. clickup.com/api/v2/list/' . $list_id . '/task');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($task_data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Authorization: ' . $api_token,
        'Content-Type: application/json'
    ));

    $response = curl_exec($ch);

    if (curl_errno($ch)) {
        echo 'Error:' . curl_error($ch);
    } else {
        echo 'success';
    }

    curl_close($ch);
}
?>
