<?php

include 'clases.php';
$conexionDB = new ConexionDB(); //creamos la conexion
//primero vamos a adoptar una solicitud post
if($_SERVER['REQUEST_METHOD'] === 'POST'){
    $data = json_decode(file_get_contents('php://input'), true); // esto es para poder obtener los datos, detectarlos de donde 
    if($data['tipoBusca'] == "distribuidor"){
        $productosDistribuidor = $conexionDB->seccionDistribuidor($data['dato']);
        echo json_encode(array("productos"=>$productosDistribuidor));
        return;
    }
    else{
    $productosSeccion = $conexionDB->seccionDatos($data['dato']);
    echo json_encode(array("productos"=>$productosSeccion));
    }
    return;
}
else{
$productos = $conexionDB->obtenerProductos();
$conexionDB->cerrarConexion();
    echo json_encode(array("productos" => $productos));
}
?>