<?php

include 'clases.php';
$conexionDB = new ConexionDB(); //creamos la conexion
//primero vamos a adoptar una solicitud post
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $jsonData =  file_get_contents("php://input");
    $data = json_decode($jsonData); // 
    $productosSeccion = $conexionDB->seccionDatos($data);
    echo json_encode(array("productos"=>$productosSeccion));
}
else{
$productos = $conexionDB->obtenerProductos();
$conexionDB->cerrarConexion();
    echo json_encode(array("productos" => $productos));
}
?>