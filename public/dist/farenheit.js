
    (function(exportar) { // triangle.js

"use strict"
 exportar.Farenheit  =   class Farenheit extends exportar.Temperatura{


              constructor(dato){
                  super(dato)
              }


              toCelsius(){

                  var result;
                  result = (this.valor - 32)*5/9;
                  result = result.toFixed(1)+"c";

                  var n = new exportar.Celsius(result);

                  return n;
               }


              toKelvin(){

                  var result;
                  result = (5*(this.valor - 32)/9) + 273.15;
                  result = result.toFixed(1) +"k";

                  var n = new exportar.Kelvin(result);

                  return n;
              }
          }
          
}(window.exportar = window.exportar || {}));
