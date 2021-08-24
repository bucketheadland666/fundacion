<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

$username = (isset($_POST['username'])) ? $_POST['username'] : '';
$first_name = (isset($_POST['first_name'])) ? $_POST['first_name'] : '';
$last_name = (isset($_POST['last_name'])) ? $_POST['last_name'] : '';
$gender = (isset($_POST['gender'])) ? $_POST['gender'] : '';
$password = (isset($_POST['password'])) ? $_POST['password'] : '';
$status = (isset($_POST['status'])) ? $_POST['status'] : '';


$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$user_id = (isset($_POST['user_id'])) ? $_POST['user_id'] : '';


switch($opcion){
    case 1:
        $consulta = "INSERT INTO entradas (titulo, descripcion, informacion, departamento) VALUES('$username', '$first_name', '$last_name', '$gender') ";			
        $resultado = $conexion->prepare($consulta);
        $resultado->execute(); 
        
        $consulta = "SELECT * FROM entradas ORDER BY id DESC LIMIT 1";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);       
        break;    
    case 2:        
        $consulta = "UPDATE entradas SET titulo='$username', descripcion='$first_name', informacion='$last_name', departamento='$gender' WHERE id='$user_id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        
        $consulta = "SELECT * FROM entradas WHERE id='$user_id' ";       
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
    case 3:        
        $consulta = "DELETE FROM entradas WHERE id='$user_id' ";		
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();                           
        break;
    case 4:    
        $consulta = "SELECT * FROM entradas";
        $resultado = $conexion->prepare($consulta);
        $resultado->execute();        
        $data=$resultado->fetchAll(PDO::FETCH_ASSOC);
        break;
}

print json_encode($data, JSON_UNESCAPED_UNICODE);//envio el array final el formato json a AJAX
$conexion=null;