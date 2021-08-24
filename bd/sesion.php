<?php

function verificacion_sesion()
{
    session_start();

    if(!isset($_SESSION['name'])){
    header('location: index.php');
    
    }else{
      if($_SESSION['expire'] <= time()){
        header('location: index.php');        
      }
      
      $usuario=$_SESSION['name'];
    
    }
    return $usuario;
}
function tipo_usuario(){
  $tipo_usuario = $_SESSION['tipo_usuario'];
  return $tipo_usuario;
}

function correo(){
 $correo = $_SESSION['correo'];
 return $correo;

}


?>