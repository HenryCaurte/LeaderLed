<?php

class ConexionDB {
    private $host = 'localhost';
    private $user = 'id21638937_leaderled123';
    private $pass = 'SoloqPapu@1';
    private $db = 'id21638937_leaderled123';
    private $conexion;  // necesitamos la conexion

    public function __construct() {
        $this->conexion = new mysqli($this->host, $this->user, $this->pass, $this->db);

        if ($this->conexion->connect_error) {
            die("Conexión fallida: " . $this->conexion->connect_error);
        }
    }

    public function obtenerProductos() {
        $arregloEnviar = array();
        $productos = "SELECT * FROM productos";
        $resultado = $this->conexion->query($productos);

        while ($fila = $resultado->fetch_assoc()) {
            array_push($arregloEnviar, array(
                "id" => $fila['ID'],
                "IdProducto"=> $fila['IdProducto'],
                "Tipo" => $fila['Tipo'],
                "SubTipo" => $fila['SubTipo'],
                "Valor" => $fila['Valor'],
                "Propiedades" => $fila['Propiedades']
            ));
        }

        return $arregloEnviar;
    }
    public function seccionDatos($tipo) { 
        $arregloEnviar = array();
        $productos = "SELECT * FROM productos WHERE Tipo = ?";
        $stmt = $this->conexion->prepare($productos);
        $stmt->bind_param("s", $tipo);
        $stmt->execute();
        $result = $stmt->get_result();
    
        // Iteramos sobre los resultados
        while ($fila = $result->fetch_assoc()) {
            array_push($arregloEnviar, array(
                "id" => $fila['ID'],
                "IdProducto" => $fila['IdProducto'],
                "Tipo" => $fila['Tipo'],
                "SubTipo" => $fila['SubTipo'],
                "Valor" => $fila['Valor'],
                "Propiedades" => $fila['Propiedades']
            ));
        }
    
        $stmt->close();
        return $arregloEnviar;
    }
    public function cerrarConexion() {
        $this->conexion->close();
    }
}

?>