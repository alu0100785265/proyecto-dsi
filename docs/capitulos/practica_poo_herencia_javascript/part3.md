## Creación clase Temperatura

> La palabra clave super es usada para llamar funciones de un objeto padre
> En este procedimiento la clase temperatura hereda de Medida sus métodos y atributos
> La funcionalidad de la clase temperatura es comprobar que el tipo de unidad introducida es correcta.
> Con el console.log comprobamos que el dato introducido es correcto y es capaz de entrar en la condicion de manera adecuada
> En el siguiente fragmento de código se muestra lo descrito anteriormente



> ```javascript
class Temperatura extends Medida{
        constructor(dato){
              super(dato)
              if ( this.type_ == "C" || this.type_ == "F" || this.type_ == "K" ||
                  this.type_ == "c" || this.type_ == "f" || this.type_ == "k" ){
                    console.log("UNIDAD DE TEMPERATURA: " + this.type_ );
              }else  console.log("UNIDAD DE TEMPERATURA INCORRECTA");
        }
}
```
