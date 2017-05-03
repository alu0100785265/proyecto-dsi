"use strict"


var unidad_medida = XRegExp('^(\\s*) \n' +
    '(?<valor> [-+]?[0-9]+(\.[0-9]+)?(?:e[+-]?[0-9]+)?) \n' +
    '(\\s*)                                             \n' +
    '(?<tipo> [fck])                                    \n' +
    '(\\s*)                                             \n' +
    '(to)?                                              \n' +
    '(\\s*)                                             \n' +
    '(?<to> [fck])?                                      \n' +
    '(\\s*)$', 'ix');



(function(exportar) { 

    "use strict"


    exportar.Medida = class Medida {

            constructor(dato) {
                var uno = XRegExp.exec(dato, unidad_medida);

                var num = uno.valor;
                var type = uno.tipo;


                num = parseFloat(num);
                this.num_ = num;
                this.type_ = type;
            }

            to_s() {


                    var a = this.num_ + " " + this.type_
                    return a

                }
                //Geter
            get valor() {
                return this.num_;
            }

            get tipo() {
                return this.type_;
            }

            //Seter
            set valor(value) {
                this.num = value;
            }

            set tipo(value) {
                this.type = value;
            }




            //se  le pasa valor y el tipo al que cambia
            convertir(valor) {
                //var measures = measures;
               

                var match = XRegExp.exec(valor, unidad_medida);
                if (match) {
                    var numero = match.valor,
                        tipo = match.tipo,
                        destino = match.to;

                    try {
                        var t = exportar.shapeType[tipo];


                        var paso = numero + tipo;

                        var e = (eval('new' + " exportar." + t + '(paso)'));

                        var dest = exportar.shapeType[destino];
                        console.log('j: ' + dest)

                        var aque = (eval('e.to' + dest + '()'));


                        //  var source = new measures[tipo](numero); // new Fahrenheit(32)
                        // var target = "to"+measures[destino]; // "toCelsius"
                        // return source[target]().toFixed(2) + " "+target; // "0 Celsius"
                        //return source[target]();
                        return aque
                    }
                    catch (err) {
                        return 'Desconozco como convertir desde "' + tipo + '" hasta "' + destino + '"';
                    }
                }
                else
                    return "Introduzca una temperatura valida: 330e-1 F to C";
            };



        }
        //module.exports = Medida;

}(window.exportar = window.exportar || {}));
