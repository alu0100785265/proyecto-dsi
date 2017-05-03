## Configurar Babel
> Babel es una compilador (traspilador) para poder pasar ECMA6 a ECMA5 el código que hayas programado con ECMA6.
> La conversión es necesaria para evitar problemas de compatibilidad con navegadores y diferentes plataformas
> Para configurar babel lo primero será ejecutar el comando:

> ```javascript
$ npm install --save-dev babel-cli
```

> Esto generará en el package.json la dependencia necesaria
> Para hacer una compilación directa será necesaria utilizar el comando:
> ```javascript
$ babel script.js --out-file script-compiled.js
```

> Donde script.js es el fichero de entrada , después se le pasa el fichero de salida con --out-file script-compiled.js , este último fichero estará escrito en ECMA5 para evitar problemas de compatibilidad

> Si queremos que compile automaticamente cada vez que modifiquemos el archivo podemos utilizar la opción --watch o -s
> ```javascript
$ babel script.js --watch --out-file script-compiled.js
```
> Instalando presets

> Por desgracia Babel no trae incorporadas todas las transformaciones así que necesitaremos instalar algunos presets dependiendo de que código queramos compilar. En nuestro caso solo necesitamos instalar babel-preset-es2015 para aplicar las transformaciones necesarias para ES6.
> ```javascript
$ npm install --save-dev babel-preset-es2015
```
> Una vez instalados los presets necesarios tenemos que crear un fichero .babelrc que tendrá esta pinta
> ```javascript
{
    "presets": ["es2015", "react"]
}
```
> Para facilitar la compilación se puede cargar el comando de transformación en el propio package.json de la siguiente manera
> ```javascript
"scripts": {
    "build": "babel src -d dist && babel --presets es2015 src -d dist"
     },
```     
> Para ejecutarlos solo tenemos que tirar los siguientes comando desde la terminal:

> ```javascript
$ npm run build
$ npm run dev
```