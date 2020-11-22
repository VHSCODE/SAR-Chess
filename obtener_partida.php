
<?php

$id_partida = $_GET['id'];
$base_datos = simplexml_load_file("partidas.xml");

$mov_array = [];


//Buscamos si la partida ya existe en la base de datos y añadimos el nuevo estado del tablero. PD: No es muy eficiente :P
//Esto se podria optimizar usandose una busqueda binaria. (Se tendria que cambiar el sistema de ids.)
foreach($base_datos->partida as $partida)
{
    if($partida['id_partida'] == $id_partida)
    {
       
        foreach($partida->movimiento as $movimiento)
        {
            $mov_array[] = $movimiento;
        }
        break;
    }
}
echo json_encode($mov_array);

?>