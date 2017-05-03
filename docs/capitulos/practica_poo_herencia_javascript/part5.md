## Interaccion HTML con Objetos


> La clase calculate muestra en el html el resultado de las conversiones de temperaturas
> Por medio de condiciones podemos acceder a los diferentes tipos de conversiones que pueden llevarse a cabo.
> Con innerHTML ponemos en el html el resultado de las operaciones de conversión
> En el siguiente fragmento de código se muestra lo descrito anteriormente

> ```javascript
 function calculate() {
    var result;
    var temp = original.value;
    var regexp = /([-+]?\d+(?:\.\d*)?)\s*([fFcCkK])/;
    var m = temp.match(regexp);
    var Cel;
    if (m == null){
      converted.innerHTML = "Unidad de temperatura incorrecta. Inserte C, K o F.";
    }
    else if (m[2]==="c" || m[2]==="C" ){
      Cel = new Celsius(temp);
      var k = Cel.to_k()
      var f = Cel.to_f()
      converted.innerHTML = k.valor + k.tipo + "\n" + f.valor + f.tipo;
    }
    else if (m[2]==="k" || m[2]==="K" ){
      Cel = new Kelvin(temp);
      var c = Cel.to_c()
      var f = Cel.to_f()
      converted.innerHTML = c.valor + c.tipo + "\n" + f.valor + f.tipo;
    }
    else if (m[2]==="f" || m[2]==="F" ){
      Cel = new Farenheit(temp);
      var c = Cel.to_c()
      var k = Cel.to_k()
      converted.innerHTML = c.valor + c.tipo + "\n" + k.valor + k.tipo;
    }
  }
```