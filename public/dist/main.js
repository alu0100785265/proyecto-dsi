
(function(exportar) { 

    "use strict"
 var shapeType;
 exportar.shapeType = shapeType = {
    Temperatura: 'Temperatura', // 2: Object Type
    Medida: 'Medida', // 2: Object Type
    c: 'Celsius',
    f: 'Farenheit',
    k: 'Kelvin',
    C: 'Celsius',
    F: 'Farenheit',
    K: 'Kelvin'
};

}(window.exportar = window.exportar || {}));


(function(exportar) { 

    "use strict"
exportar.convertir = function convertir(shape, options) {

    console.log(shape + "shapee ga")

    var measures = (eval('new' + ' exportar.' + shape + '(options.dato)'));
    console.log(measures.typeof + "shapee gaaa")

    var result = measures.convertir(options.dato);
        console.log(result + "shacccccccpee gaaa")

    return result;

}
}(window.exportar = window.exportar || {}));

(function(exportar) { 
    
exportar.calculate = function calculate() {
    var uno = XRegExp.exec(original.value, unidad_medida);
    var num = uno.valor;
    var type = uno.tipo;

    var a = exportar.convertir(exportar.shapeType[type], {
        dato: original.value
    });

    converted.innerHTML = a.to_s();

}
}(window.exportar = window.exportar || {}));
