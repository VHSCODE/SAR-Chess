
var tableros = []

var juegos = []
function test(id_partida)
{
    console.log(id_partida);
}


function crear_repeticion(id_partida)
{
    xhr = new XMLHttpRequest()

    var req = 'obtener_partida.php?id='+ id_partida

    console.log(req);
    xhr.open('GET',req,false)
    xhr.send('')

    var movimientos = JSON.parse(xhr.responseText);
    console.log(movimientos);
    juegos.push(new Chess())
    tableros.push(Chessboard(id_partida))

}