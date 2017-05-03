(function(exportar) { // triangle.js

"use strict"

 exportar.Kelvin =  class Kelvin extends exportar.Temperatura{


                 constructor(dato){
                     super(dato)
                 }

                 toCelsius(){

                     var result;
                     result = (this.valor - 273);
                     result = result.toFixed(1) +"c";

                     var n = new exportar.Celsius(result);

                     return n;
                 }

                 toFarenheit(){

                     var result;
                     result = 1.8*(this.valor - 273)+ 32;
                     result = result.toFixed(1) + "f";

                     var n = new exportar.Farenheit(result);

                     return n;
                 }
             }
             
}(window.exportar = window.exportar || {}));