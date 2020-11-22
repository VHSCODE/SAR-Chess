class Partida
{
    constructor(juego,tablero,movimientos)
    {
        this.tablero = tablero
        this.movimientos = movimientos
        this.contador = 0;
    }

    crear_partida(id_partida,movi)
    {
        this.tablero = Chessboard(id_partida,'start')
        this.movimientos = movi
    }
    adelante()
    {
        if(this.contador + 1 < this.movimientos.length)
        {
            this.contador = this.contador + 1
            this.tablero.position(this.movimientos[this.contador][0].trim())
        }
    }
    atras()
    {
        if(this.contador >= 1)
        {
            this.contador -=1
            this.tablero.position(this.movimientos[this.contador][0].trim())
        }
        
    }
}
var partidas = {}

function crear_repeticion(id_partida) 
{
    xhr = new XMLHttpRequest()
    var req = 'obtener_partida.php?id=' + id_partida
    xhr.open('GET', req, true)
    xhr.onreadystatechange = function () 
    {
        if (xhr.readyState == 4 && xhr.status == 200) 
        {
            movimientos = JSON.parse(xhr.responseText);
            partidas[id_partida] = new Partida();
            partidas[id_partida].crear_partida(id_partida,movimientos)
        }
           
    }
    xhr.send('')
}


function adelante(id_partida)
{
    partidas[id_partida].adelante()
}

function atras(id_partida)
{
    partidas[id_partida].atras()
}