<?php 

class Modelo_Grafico{
    private $conexion;
    function __construct(){
        require_once('conexion.php');
        $this->conexion = new Conexion();
        $this->conexion->conectar();
    }


    function get_grafico_por_mes(){
        $sql = "CALL CARGAR_TODOS_LOS_DATOS"; //CALL CARGAR_TODOS_LOS_DATOS llama a procedimientos almacenados
        $arreglo = array();
        if($consulta = $this->conexion->conexion->query($sql)){
            while($consultaVU = mysqli_fetch_array($consulta)){
                $arreglo[] = $consultaVU;}
            return $arreglo;
            $this->conexion->cerrar();
        }
    }
}
