<?php 

require 'modelo_grafico.php';
$MG =new Modelo_Grafico();
$consulta = $MG->get_grafico_por_mes();
echo json_encode($consulta);

?>