/*  INSTRUCCIONES


crear punto: 
-hacer click

Crear arista: 
-hacer click en punto existente
-hacer click en punto existente

Borrar punto:
- Ctrl + Click
(borra también aristas correspondientes)

Cargar imagen:
-Clickear Browse y elegir imagen

Cambiar colores:
-Click en selector de color correspondiente (abajo izquierda)

Cambiar tamaño:
-Click en fader de tamaño correspondiente (abajo izquierda)

*/

let sliderPuntos;
let sliderLineas;
var canvas;
let grafo1;


//variable temporal (privada)
var candidatoAr = null
//de distancia (privada)
var treshold = 10



var imagenOn = true
let botonImagenOn









////*----------------------------------------------------------------------

function setup() {

  canvas = createCanvas(540, 540);
  grafo1 = new Grafo({
    x: width / 2,
    y: height / 2
  }, {
    x: 0,
    y: 543
  })

  canvas.mouseClicked(clicked)
  strokeWeight(10);
  grafo1.preload()




}

function clicked() {
  grafo1.clicked()
}

function keyPressed() {
  grafo1.keyPressed(keyCode)

}

function keyReleased() {
  grafo1.keyReleased(keyCode)
}



///*---------------------------------------------------------------
function draw() {

  grafo1.draw()
  grafo1.move()

}
