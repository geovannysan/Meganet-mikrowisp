<?php
$request_body = file_get_contents('php://input');
$data = json_decode($request_body, true);

$cedula = $data["cedula"];
$data = array(
    'token' => 'TTZqNnlucVpuZmJUUXRzcDVSci9QQT09',
    'cedula' =>$cedula,
);

$ch = curl_init("https://177.234.197.134/api/v1/GetClientsDetails");
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));


curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$resultStr = curl_exec($ch);
echo json_encode($resultStr);

?>

