<html>

<body>
    
</body>

<?php

$id_partida = $_GET['id_partida'];
$estado = $_GET['estado'];
$base_datos = simplexml_load_file("partidas.xml");


$existe_partida = false;

//Buscamos si la partida ya existe en la base de datos y añadimos el nuevo estado del tablero. PD: No es muy eficiente :P
//Esto se podria optimizar usandose una busqueda binaria. (Se tendria que cambiar el sistema de ids.)
foreach($base_datos->partida as $partida)
{
    if($partida['id_partida'] == $id_partida)
    {
        $partida->addChild('movimiento',$estado);
        $existe_partida = true;
        break;
    }
}

if(!$existe_partida)
{
    $nueva_entrada = $base_datos->addChild('partida');
    $nueva_entrada->addAttribute('id_partida',$id_partida);
    $nueva_entrada->addChild('movimiento',$estado);    
}

$base_datos->asXML('partidas.xml');


?>
</html>