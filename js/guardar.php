<?php
header("Content-Type: application/json");
$data = array();
$file = $_FILES["fileTest"]["name"]; //Nombre de nuestro archivo
$validator = 1; 
$hoy = date("YmdHis");
$file_type = strtolower(pathinfo($file,PATHINFO_EXTENSION));
$url_temp = $_FILES["fileTest"]["tmp_name"]; //Ruta temporal a donde se carga el archivo 
$url_insert = dirname(__FILE__) . "./../files"; 

$url_target = str_replace('\\', '/', $url_insert) . '/' .$hoy.".".$file_type;
$direccion ="https://meganet.covagu.com/files/".$hoy.".".$file_type;
if (!file_exists($url_insert)) {
    mkdir($url_insert, 0777, true);
};
$file_size = $_FILES["fileTest"]["size"];
if ( $file_size > 1000000) {
    $data['status'] = false;
    $data['result'] = "El archivo es muy pesado";
    echo json_encode($data);
  $validator = 0;
}
if($file_type != "jpg" && $file_type != "jpeg" && $file_type != "png" && $file_type != "gif" ) {
    $data['status'] = false;
    $data['result'] = "Solo se permiten imágenes tipo JPG, JPEG, PNG & GIF";
    echo json_encode($data);
  $validator = 0;
}
if($validator == 1){
    if (move_uploaded_file($url_temp, $url_target)) {
        $data['status'] = true;
        $data['result'] = $direccion;
     
        echo json_encode($data);
        $files2 = glob('./../files/*'); 
        foreach ($files2 as $fil) {
            $lastModifiedTime = filemtime($fil);
            $currentTime = time();
            $timeDiff = abs($currentTime - $lastModifiedTime) / (60 * 60); //horas
            if (is_file($fil) && $timeDiff > 1) {
                unlink($fil); //elimino el fichero
            }
        }      
    } else {
        $data = array("status" => false, "link" => "error");
        echo json_encode($data);       
    }
    $data['status'] = false;
    $data['result'] = "Error: el archivo no se ha cargado";
}
?>