
( function(exportar) { // triangle.js
 "use strict"
//var Medida = new Medida("15c");
 
 exportar.Temperatura = class Temperatura extends  exportar.Medida{

        constructor(dato){
              super(dato)
              if ( this.type_ == "C" || this.type_ == "F" || this.type_ == "K" ||
                  this.type_ == "c" || this.type_ == "f" || this.type_ == "k" ){

                    console.log("UNIDAD DE TEMPERATURA: " + this.type_ );

              }else  console.log("UNIDAD DE TEMPERATURA INCORRECTA");

        }


}

}(window.exportar = window.exportar || {}));

