var board = null
var game = new Chess()
var $status = $('#status')

var id =''
var config = {
    draggable: true,
    onDragStart: onDragStart,
    onDrop: onDrop,
    onSnapEnd: onSnapEnd
}
board = Chessboard('tablero', config)

//Creamos las rutinas de atencion de los botones
$('#empezar').on('click', empezarPartida)
$('#resetear').on('click', resetear)


$status.html("Esperando...")


xhr = new XMLHttpRequest()



function onDragStart(source, piece, position, orientation) {
    if (game.game_over()) {
        return false;
    }
    //Solo dejamos que las fichas correspondientes al turno actual se puedan coger
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
        return false
    }

}

function onDrop(source, target) {

    //Comprobamos si el movimiento es legal
    var move = game.move({
        from: source,
        to: target,
        promotion: 'q'
    })

    //Si es ilegal, hacemos que la pieza vuelva a su sitio
    if (move === null) return 'snapback'

    actualizar_estado()

}

function onSnapEnd() {
    board.position(game.fen())
}

function actualizar_estado() 
{
    var estado = ''

    var turno = 'blancas'
    if (game.turn() === 'b') 
    {
        turno = 'negras'
    }
        if (game.in_checkmate()) 
        {
            estado = "Final de Partida. Las " + turno + " estan en Jaque Mate."
        } 
        else if (game.in_draw()) {
            estado = "Final de Partida. Tablas"
        } 
        else 
        {
            estado = "Juegan " + turno

            //Comprobamos si hay jaque
            if (game.in_check()) {
                estado += ". Las " + turno + " estan en Jaque."
            }
        }

        $status.html(estado)
        enviar_tablero_servidor()
    }


function empezarPartida() {
    board.start()
    id = Math.random().toString(16).substr(2, 16);
    $('#empezar').attr("disabled", true);

    actualizar_estado()
}


function resetear() {
    board.clear()
    game.reset()
    id = ''
    $('#empezar').attr("disabled", false)
    $status.html("Esperando...")
}
/**
 * Esta funcion envia el id de la partida junto con un string que representa el estado actual del tablero al servidor.
 */
function enviar_tablero_servidor()
{
    xhr.open('GET','partidas.php?id_partida='+id+"&estado=" + game.fen(),true)
    xhr.send('')
}