### pic64
Libreria para la transformación sencilla de imagenes a base 64 directamente desde Javascript en el cliente

## Como usarla? muy facil..
1. Primero incluye el archivo en tu html
2. luego tienes que crear un objeto de javascript
    var p = new pic64();
3. hay que agregar un evento para cuando termine de cargar la imagen que se seleccione
    p.onready = function(e, msg){
        //info(args);
    }
4. como leo una imagen?
    p.readImageFrom('id_input_type_file_without_#');
5. una vez terminado se dispara el evento onready y dentro podriamos hacer
    var imgstr = p.getImageBase64();
6. Hay mas metodos como: getMIME, getHeader, isEmpty, checkIfBusy... para objeter informacion de la imagen cargada


