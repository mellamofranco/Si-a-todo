class Grafo {
  constructor(pos, posControl) {

    // datos 
    this.aristas = []
    this.puntos = []
    this.controles = []
    this.ctrlOn = false


    this.pos = pos;
    this.grafoActivo = true

    this.crearControles(posControl)

  }

  //---------------------------------------
  //function --> preload
  preload() {
    this.imgDefault = loadImage('assets/01.png');
  }

  //------------------------------------------------------------------------------------//
  crearControles(pos) {
    /* for(ctrl of this.controles){
     if (this.showControles){
      ctrl.style('display', 'none' o 'block')}
    */


    //grafo.createControls()

    //ctrl grafo --> color puntos
    this.colorPickerPuntos = createColorPicker("white");
    this.colorPickerPuntos.position(pos.x, pos.y);

    //ctrl grafo --> color lineas
    this.colorPickerLineas = createColorPicker("red");
    this.colorPickerLineas.position(pos.x + 100, pos.y);

    //ctrl grafo --> ancho punto
    this.sliderPuntos = createSlider(0, 80, 8);
    this.sliderPuntos.position(pos.x, pos.y + 25);
    this.sliderPuntos.style('width', '80px');

    //ctrl grafo --> ancho linea
    this.sliderLineas = createSlider(0, 80, 2);
    this.sliderLineas.position(pos.x + 100, pos.y + 25)
    this.sliderLineas.style('width', '80px');

    //ctrl grafo --> guardar
    this.botonSalvar = createButton('Salvar');
    this.botonSalvar.position(pos.x, pos.y + 50);
    this.botonSalvar.mousePressed(this.salvarJson(this));

    //agregar this.controles.push(this.botonSalvar)

    //ctrl grafo --> cargar grafo
    this.inp = createFileInput(this.onLoadedFile(this));
    this.inp.position(pos.x + 59, pos.y + 50)

    //ctrol grafo --> imagen on/off
    this.imagenOnButton = createButton('Imagen On/Off');
    this.imagenOnButton.position(pos.x + 250, pos.y);
    this.imagenOnButton.mousePressed(this.activarImagen(this));


    //ctrol img --> cargar imagen
    this.input = createFileInput(this.handleFile(this));
    this.input.position(pos.x + 250, pos.y + 50);
  }

  //listeners (callbacks)---------------------------------
  salvarJson(that) {
    return function(event) {
      var nombreGrafo = prompt("Nombre: ");
      console.log(this)
      var objString = JSON.stringify({
        puntos: that.puntos,
        aristas: that.aristas
      }, that.getCircularReplacer(), 4)
      that.downloadObjectAsJson(objString, nombreGrafo)
    }
  }

  //funcion cargar----------
  onLoadedFile(that) {
    return function(file) {
      var base64Str = file.data.split(",")[1];
      var jsonStr = atob(base64Str);
      // Parse the JSON object into a Javascript object
      var obj = JSON.parse(jsonStr);
      print(obj)
      /* grafo = this.populateVectors({
         puntos:this.puntos,
         aristas:this.aristas
       })*/
      let candidatoGrafo = that.populateVectors(obj)
      that.puntos = candidatoGrafo.puntos
      that.aristas = candidatoGrafo.aristas
    }
  }

  //activar imagen-----------
  activarImagen(that) {
    return function(event) {
      imagenOn = !imagenOn
      console.log("imagen: " + imagenOn)
    }
  }

  //funcion handle img
  handleFile(that) {
    return function(file) {
      print(file);
      if (file.type === 'image') {
        that.img = createImg(file.data, '');
        that.img.hide();
      } else {
        that.img = null;
      }
    }
  }
  //keypressed------
  keyPressed(tecla) {
    var CTRL = 17
    if (tecla == CTRL) {
      this.ctrlOn = true
    }
  }
  keyReleased(tecla) {
    var CTRL = 17
    if (tecla == CTRL) {
      this.ctrlOn = false
    }
  }


  clicked() {
    //on click grafo-------------
    //grafo.clicked
    if (!this.ctrlOn) {
      console.log("clicked")
      var punto = createVector(mouseX, mouseY)
      if (!this.puntoExiste(punto)) {
        this.puntos.push(punto)
        console.log("crear punto")
      } else {

        if (candidatoAr) {
          let puntoGrafo = this.puntoExiste(punto)
          if (puntoGrafo) {
            candidatoAr.push(puntoGrafo)
            this.aristas.push(candidatoAr)
            console.log(candidatoAr)
            candidatoAr = null
          }

        } else {
          let puntoGrafo = this.puntoExiste(punto)

          if (puntoGrafo) {
            candidatoAr = []
            candidatoAr.push(puntoGrafo)

          }
        }
      }
    } else {
      console.log("BORRAR")


      //elimar punto------------------------------
      var punto = createVector(mouseX, mouseY)
      if (this.puntoExiste(punto)) {

        var puntoABorrar = this.puntoExiste(punto)
        var idx = this.puntos.indexOf(puntoABorrar)
        this.puntos[idx] = null
        console.log(idx)
        //borrar edge del punto--------------------

        for (let idxArista in this.aristas) {
          if (this.aristas[idxArista]) {
            var idx = this.aristas[idxArista].indexOf(puntoABorrar)
            if (idx !== -1) {
              this.aristas[idxArista] = null
            }
          }
        }
        console.log("borrar")
      }
    }
  }

  //************************---------------------------------------
  draw() {
    //leer sliders
    let valPuntos = this.sliderPuntos.value();
    let valLineas = this.sliderLineas.value();

    // bacground on/off
    if (!this.img) {
      background(0);
    }
    if (imagenOn > 0.1) {
      background(220);
      if (this.img) {
        image(this.img, 0, 0, width, height);
      } else {
        image(this.imgDefault, 0, 0, width, height);
      }
    }

    //atributos lineas
    strokeCap(ROUND);
    strokeWeight(valLineas)
    stroke(this.colorPickerLineas.color())

    //Dibujar lineas recorriendo array
    for (let arista of this.aristas) {
      if (arista) {
        line(arista[0].x, arista[0].y, arista[1].x, arista[1].y)
      }
    }


    //atributos puntos
    strokeWeight(valPuntos)
    stroke(this.colorPickerPuntos.color())

    //dibujar puntos recorriendo array

    for (let punto of this.puntos) {
      if (punto) {
        point(punto)
      }
    }

  }

  //---------------------------------------------------------





  //*-------------------------------------------------------------
  move() {
    this.x = this.x + random(-5, 5)
    this.y = this.y + random(-5, 5)
  }



  changeBG() {
    let val = random(255);
    background(val);
  }


  puntoExiste(p) {

    for (let punto of this.puntos) {
      if (punto) {
        var distancia = p.dist(punto)
        if (distancia < treshold) {
          console.log("existe")
          return punto
        }
      }
    }
    return false

  }


  //funciones utilitarias-----------------------------------------------------

  //function --> populate vector agarrar obj cargado y devolver obj pero con vectores p5
  populateVectors(obj) {

    for (let idxPunto in obj.puntos) {
      var punto = obj.puntos[idxPunto]
      obj.puntos[idxPunto] = createVector(punto.x, punto.y)

    }
    for (let idxArista in obj.aristas) {
      //arist1
      var puntoA = obj.aristas[idxArista][0]
      var puntoB = obj.aristas[idxArista][1]
      obj.aristas[idxArista][0] = createVector(puntoA.x, puntoA.y)
      obj.aristas[idxArista][1] = createVector(puntoB.x, puntoB.y)
    }
    return obj
  }
  //funcion --> salvar

  getCircularReplacer() {
    const seen = new WeakSet();
    return (key, value) => {
      if (key === 'p5') {
        return
      }
      return value;
    };
  };

  downloadObjectAsJson(objString, exportName) {
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(objString);
    var downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }


}



/* posicion
   escala
   rotacion
   
   color puntos
   color lineas
   
   trails
   noise
*/
