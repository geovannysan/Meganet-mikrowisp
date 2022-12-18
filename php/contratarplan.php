<?php

$nombrecont = $_POST['nombrecont'];
$cedularuc = $_POST['cedularuc'];
$telefono1 = $_POST['phone1'];
$telefono2 = $_POST['phone2'];
$emailcont = $_POST['emailcont'];
$direccioncont = $_POST['direccioncont'];
$indicaciones = $_POST['indicaciones'];
$nombreper = $_POST['nombreper'];
$phoneper = $_POST['phoneper'];
$nombrefam = $_POST['nombrefam'];
$phonefam = $_POST['phonefam'];
$plan = $_POST['planes'];

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, "https://portal.meganet.net.ec/api/v1/NewPreRegistro");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
curl_setopt($ch, CURLOPT_HEADER, FALSE);

curl_setopt($ch, CURLOPT_POST, TRUE);

curl_setopt($ch, CURLOPT_POSTFIELDS, "{
  \"token\": \"TTZqNnlucVpuZmJUUXRzcDVSci9QQT09\",
  \"cliente\": \"$nombrecont\",
  \"cedula\": \"$cedularuc\",
  \"direccion\": \"$direccioncont\",
  \"telefono\": \"$telefono2\",
  \"movil\": \"$telefono1\",
  \"email\": \"$emailcont\",
  \"notas\": \"$indicaciones, Referencia personal: $nombreper, Telefono: $phoneper, Referencia Familiar: $nombrefam Telefono: $phonefam, Plan: $plan, Ingresado desde la Web\"
  
}");

curl_setopt($ch, CURLOPT_HTTPHEADER, array(
  "Content-Type: application/json"
));

$response = curl_exec($ch);
curl_close($ch);

//direccion despues de enviar
header('location:ingresada-correctamente.html');

?>