(function(exportar) {
  "use strict"


  exportar.Celsius = class Celsius extends exportar.Temperatura {

    constructor(dato) {

      super(dato)
    }


    toKelvin() {

      var result;
      result = (this.valor + 273);
      result = result.toFixed(1) + "k";

      var n = new exportar.Kelvin(result);

      return n;
      
    }

    toFarenheit() {


      var result;
      result = (this.valor * 1.8) + 32;
      result = result.toFixed(1) + "f";
      console.log("ahora")
      var n = new exportar.Farenheit(result);
        
      return n;
      
    }
  }


}(window.exportar = window.exportar || {}));
