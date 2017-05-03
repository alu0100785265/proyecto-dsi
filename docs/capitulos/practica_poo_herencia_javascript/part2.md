## Creación clase Medida

> Una de las ventajas de utilzar ECMA6 es que puede utilizar la palabra class para trabajar con objetos de manera más fácil
> La clase medida lleva su constructor que tiene como tarea desglozar la entrada que se inserte en el html y asi poder trabajar de una manera más fácil
> La clase constructor tiene su getter y su setter tanto para mostrar el número como para poder ver su unidad de medida 
> El método to_s devuelve la cadena de entrada a un string
> En el siguiente fragmento de código se muestra lo descrito anteriormente

> ```javascript
class Medida{
    constructor(dato){
         var regexp = /([-+]?\d+(?:\.\d*)?)\s*([fFcCKk])/;
         var m = dato.match(regexp);
         var num = m[1];
         var type = m[2];
         num = parseFloat(num);
         this.num_ = num;
         this.type_ = type;
    }
    to_s(){
        var a = this.num_.toFixed(1) + this.type_.toFixed(1);
        console.log(a)
        return a;
    }
    //Geter
    get valor(){
        return this.num_;
    }
    get tipo(){
        return this.type_;
    }
    //Seter
   set valor(value){
        this.num=value;
    }
    set tipo(value){
        this.type=value;
    }
}
```
