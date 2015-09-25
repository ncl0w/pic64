/*
 * pic64 v0.5 - Clase para el manejo de imagenes base64
 *
 * por: Mauricio Manjarrez Magallón, @wealthymaury
 *
 * ready - true en todo momento, excepto cuando esta procesando que se pone false
 * los datos se pueden extraer con los geters hasta que ready es true
 * si no hay imagen procesada retorna cadena vacia
 *
 * metodos:
        onready - funcion que se sobreescribe desde fuera del objeto para manejar evento
        readImageFrom(id) - recide un id de jquery, pone ready en false hasta que se termine la lectura
        
 */

var pic64 = function()
{
    this.ready = true;
    this.imageBase64 = "";
    this.imageHeader = "";
    this.imageMIME = "";
    this.context = null;

    /*
     * esta funcion puede ser sobreescrita desde afuera del objeto y se ejecuta
     */
    this.onready = function(){};
    $(this).on('ready', this.onready);

    this.readImageFrom = function(id)
    {
        var selector = '#' + id;
        var files = $(selector)[0].files;

        if(files.length == 0)
        {   
            $(this).trigger('ready', ["No se encontro imagen"]);
            return "";
        }

        this.ready = false;
        this.Reader = new FileReader();
        this.Reader.context = this;

        this.Reader.onloadend = function(e)
        {
            this.context.imageBase64 = e.target.result;
            this.context.imageHeader = this.context.imageBase64.substring(0, this.context.imageBase64.indexOf(","));
            this.context.ready = true;

            $(this.context).trigger('ready', ["Imagen procesada"]);
        };

        this.Reader.readAsDataURL(files[0]);
    },
    this.getMIME = function(head)
    {
        this.checkIfBusy();
        return this.imageHeader.replace(/data:([^;]+).*/, '\$1');
    },
    this.getImageBase64 = function()
    {
        this.checkIfBusy();
        return this.imageBase64;
    }
    this.getHeader = function()
    {
        this.checkIfBusy();
        return this.imageHeader;
    }
    this.isEmpty = function()
    {
        this.checkIfBusy();
        return this.imageBase64.length == 0;
    }
    this.checkIfBusy = function()
    {
        if(! this.ready)
        {
            throw "Objeto ocupado, espere a que termine...";
        }
    }
}

/*
 * Implementacion
 *
 * var p = new pic64();
 * p.onready = function(e, msg){
 *     info(args);
 * }
 *
 * p.readImageFrom('id');
 * p.getImageBase64();
 */