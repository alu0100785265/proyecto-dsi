## Creacion clase Celsius, Fahrenheit, Kelvin

> La clase Celsius tiene declarado su propio constructor y hereda de la clase Temperatura
> Con la palabra reservada super podemos acceder a las propiedades de los métodos superiores
> La clase Celsius esta compuesta de sus métodos que convierten a unidades de otro tipo.
> Dentro de cada método se llama a su constructor de la unidad a convertir y lo devuelve como resultado
> En el siguiente fragmento de código se muestra lo descrito anteriormente


> ```javascript
class Celsius extends Temperatura{
        constructor(dato){
            super(dato)
        }
        to_k(){
            var result;
            result = (this.valor + 273);
            result = result.toFixed(1) +"k";
            var n = new Kelvin(result);
            return n;
         }
         to_f(){
            var result;
            result = (this.valor * 1.8) + 32;
            result = result.toFixed(1) +"f";
            var n = new Farenheit(result);
            return n;
         }
    }
```
> La clase Farenheit tiene declarado su propio constructor y hereda de la clase Temperatura
> Con la palabra reservada super podemos acceder a las propiedades de los metodos superiores
> La clase Farenheit esta compuesta de sus métodos que convierten a unidades de otro tipo.
> Dentro de cada método se llama a su constructor de la unidad a convertir y lo devuelve como resultado
> En el siguiente fragmento de código se muestra lo descrito anteriormente

> ```javascript
    class Farenheit extends Temperatura{
        constructor(dato){
            super(dato)
        }
        to_c(){
            var result;
            result = (this.valor - 32)*5/9;
            result = result.toFixed(1)+"c";
            var n = new Celsius(result);
            return n;
         }
        to_k(){
            var result;
            result = (5*(this.valor - 32)/9) + 273.15;
            result = result.toFixed(1) +"k";
            var n = new Kelvin(result);
            return n;
        }
    }
```

> La clase Kelvin tiene declarado su propio constructor y hereda de la clase Temperatura
> Con la palabra reservada super podemos acceder a las propiedades de los metodos superiores
> La clase Kelvin esta compuesta de sus métodos que convierten a unidades de otro tipo.
> Dentro de cada método se llama a su constructor de la unidad a convertir y lo devuelve como resultado
> En el siguiente fragmento de código se muestra lo descrito anteriormente

> ```javascript
     class Kelvin extends Temperatura{
        constructor(dato){
            super(dato)
        }
        to_c(){
            var result;
            result = (this.valor - 273);
            result = result.toFixed(1) +"c";
            var n = new Celsius(result);
            return n;
        }
        to_f(){
            var result;
            result = 1.8*(this.valor - 273)+ 32;
            result = result.toFixed(1) + "f";
            var n = new Farenheit(result);
            return n;
        }
    }
```