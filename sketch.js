let colorPickerPuntos;
let colorPickerLineas;
let img;
var canvas;

var grafo = {
  aristas: [],
  puntos: [],
};
var candidatoAr = null
var treshold = 10


function preload() {
  img = loadImage('assets/01.png');
}

function setup() {
  canvas = createCanvas(540,540);
  canvas.mouseClicked(clicked)
  strokeWeight(10);
  
  colorPickerPuntos = createColorPicker(255);
  colorPickerPuntos.position(0, height + 5);
  colorPickerLineas = createColorPicker("red");
  colorPickerLineas.position(50, height + 5);
}

function clicked() {
  var punto = createVector(mouseX, mouseY)
  if (!puntoExiste(punto)) {
    grafo.puntos.push(punto)
    console.log("punto")
  } else {

    if (candidatoAr) {
      let puntoGrafo = puntoExiste(punto)
      if (puntoGrafo) {
        candidatoAr.push(puntoGrafo)
        grafo.aristas.push(candidatoAr)
        console.log(candidatoAr)
        candidatoAr = null
      }

    } else {
      let puntoGrafo = puntoExiste(punto)

      if (puntoGrafo) {
        candidatoAr = []
        candidatoAr.push(puntoGrafo)

      }
    }
  }

}

function puntoExiste(p) {

  for (let punto of grafo.puntos) {
    var distancia = p.dist(punto)
    if (distancia < treshold) {
      console.log("existe")
      return punto
    }
  }
  return false

}

function draw() {
  background(220);
  image(img, 0, 0,width,height);
  strokeCap(ROUND);
  strokeWeight(2)
  stroke("red")
  //peso de lineas
  for (let arista of grafo.aristas) {
    line(arista[0].x, arista[0].y, arista[1].x, arista[1].y)
  }



  strokeWeight(8)
  stroke(colorPickerPuntos.color())
  //peso puntos


  for (let punto of grafo.puntos) {
    point(punto)
  }


}