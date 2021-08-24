<?php
class conexion{
    private $server;  // Servidor de la base de datos
    private $usuario; // Usuario de la base de datos
    private $pass; // Contraseña de la base de datos
    private $base; // Base de datos
    public $conexion; // Objeto de la conexión

    function __construct(){
        $this->server = "localhost";
        $this->usuario = "root";
        $this->pass = "";
        $this->base = "estadisticas";
    }
    function conectar(){
        $this->conexion = new mysqli($this->server, $this->usuario, $this->pass, $this->base);
        $this->conexion->set_charset("utf8");
    }
    function cerrar(){
        $this->conexion->close();
    }
}
?> 
