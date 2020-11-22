<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Repeticiones de Ajedrez</title>
</head>
<body>

    <?php
    $base_datos = simplexml_load_file("partidas.xml");

    foreach($base_datos->partida as $partida)
    {

        $id_partida = $partida['id_partida'];
        echo '<h4><a href="#" onclick=crear_repeticion("' . $id_partida. '")>Partida ' . $id_partida ."</a></h4> <br>";
        echo "<div id='$id_partida' style='width: 400px'></div>";
        echo '<button onclick=atras("' . $id_partida. '")><--</button>';
        echo '<button onclick=adelante("' . $id_partida. '")>--></button>';
    }
    ?>


    <link rel="stylesheet" href="css/chessboard-1.0.0.min.css">
    <script src="jquery-3.5.1.js"></script>
    <script src="js/chessboard-1.0.0.min.js"></script>
    <script src="chess.js"></script>
    <script src="repeticiones.js"></script>
</body>
</html>