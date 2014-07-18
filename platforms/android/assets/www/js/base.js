var url_base="http://mundial.apliko.co/";
//var url_base="http://centroscomercialesweb.esy.es/";
var idioma="PO";    
//var url_base="http://192.168.0.13/PollaMundialistaWeb/";
document.addEventListener("deviceready", onDeviceReady, false);

    // device APIs are available
    //
    function onDeviceReady() {
        //checkConnection();
    }
function checkConnection()
{
	var networkState = navigator.connection.type;
	console.log("networkState: "+networkState);
	var states = {};
	states[navigator.connection.UNKNOWN] = 'Unknown connection';
	states[navigator.connection.ETHERNET] = 'Ethernet connection';
	states[navigator.connection.WIFI] = 'WiFi connection';
	states[navigator.connection.CELL_2G] = 'Cell 2G connection';
	states[navigator.connection.CELL_3G] = 'Cell 3G connection';
	states[navigator.connection.CELL_4G] = 'Cell 4G connection';
	states[navigator.connection.CELL] = 'Cell generic connection';
	states[navigator.connection.NONE] = 'No network connection';
	console.log("states[networkState]: "+states[networkState] );
	if (states[networkState] == 'No network connection')
			bPopUpOpen("Esta aplicación requiere conexión de datos, verifica la señal de tu operador celular o conéctate a una red Wifi","continuar");
	else
		return true;
		
}
$(document).ready(
    function()
    {
        (function()
        {
            //checkConnection();
        })();
        $('.atras').click(
            function(e)
            {
                e.preventDefault();
                anterior();
            }
        );
        $('.menu').click(
            function(e)
            {
                e.preventDefault();
                redirigir("2.html");
            }
        );
        $('.config').click(
            function(e)
            {
                e.preventDefault();
                redirigir("7a.html");
            }
        );
        $('#continuar').click(
            function(e)
            {
                e.preventDefault();
                recargar();
            }
        );
    }
);

function validarEmail( email ) {
    expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if ( !expr.test(email) )
        return false;
    else
        return true;
}

function recargar(){
    location.reload();
}

//Muestra un dialogo que no se puede cerrar
function cambiarMensajePopUp(mensaje)
{
    $('#mensaje').html("<div align='center'>"+mensaje+"</div>");
}

//Muestra un dialogo que no se puede cerrar
function bPopUpOpenCargando(mensaje)
{
ocultarBotonesMensjes();
    //$('#mensaje').html("<div align='center'><img src='images/loading.gif'  width='50px' height='50px' /><br><p align='center' width='100%'>"+mensaje+"</p></div>");
    $('#element_to_pop_up').css("background","none");
    $('#mensaje').html("<div align='center'><img src='images/loading.gif'  width='90px' height='55px' /></div>");
    $('#element_to_pop_up').bPopup({
        escClose: false,
        modalClose: false
    });

}
function ocultarBotonesMensjes()
{
    $("#aceptar").css("display","none");
    $("#continuar").css("display","none");
    $("#cancelar").css("display","none");
}
//Muestra un dialogo que no se puede cerrar
function bPopUpOpen(mensaje,visibles)
{
	ocultarBotonesMensjes();
     $('#element_to_pop_up').css("background","#cccccc");
    visibles=visibles.split("-");
    visibles.forEach(function(entry) {
        $("#"+entry).css("display","block");
    });
    cambiarMensajePopUp(mensaje);
    $('#element_to_pop_up').bPopup({
        escClose: false,
        modalClose: false
    });

}
//Muestra un dialogo que no se puede cerrar
function bPopUpClosed()
{
    
    $('#element_to_pop_up').bPopup().close();

}
function crearVariableSesion(nombre, valor)
{
    console.log(nombre+": "+valor)
    localStorage.setItem(nombre, valor);
}
function obtenerVariable(nombre)
{
    var valor = localStorage.getItem(nombre);
    return valor;
}

function salir()
{
    navigator.app.exitApp();
}
function anterior()
{
    window.history.back();
}
/*Esta funcion se encarga de realizar una llamada ajax y retornar el resultado, retorna null en caso de algun error
var datos = {
  "id"     : blog.id,
  "name"   : blog.name,
  "url"    : blog.url,
  "author" : blog.author
};

*/
function ajax(url2, datos, callback)
{
    var retornar=null;
    try
    {
        $.ajax({
            url: url2,
            type: "POST",
            data: datos,
            headers: { 'Access-Control-Allow-Origin': '*' },
            crossDomain: true,
            error: function( jqXHR, textStatus, errorThrown )
            {
                console.log("errorThrown");
				console.log("err: "+jqXHR.responseText);
                callback(null);
				bPopUpOpen("Esta aplicación requiere conexión de datos, verifica la señal de tu operador celular o conéctate a una red Wifi","continuar");
            },
            success: function(data)
            {
                retornar=data;
            }
        }).done(function()
        {
            callback(retornar);
        });
    }
    catch(err)
      {
          console.log("Entre al error");
			bPopUpOpen("Esta aplicación requiere conexión de datos, verifica la señal de tu operador celular o conéctate a una red Wifi","continuar");
      }
    
    
}
/*
Est funcion se encarga de determinar si hay conexion de internet
*/
function checkInternet()
{
    /*var networkState = navigator.connection.type;
    alert(networkState);
    var states = {};
    states[navigator.connection.UNKNOWN] = 'Unknown connection';
    states[navigator.connection.ETHERNET] = 'Ethernet connection';
    states[navigator.connection.WIFI] = 'WiFi connection';
    states[navigator.connection.CELL_2G] = 'Cell 2G connection';
    states[navigator.connection.CELL_3G] = 'Cell 3G connection';
    states[navigator.connection.CELL_4G] = 'Cell 4G connection';
    states[navigator.connection.CELL] = 'Cell generic connection';
    states[navigator.connection.NONE] = 'No network connection';
    if (states[networkState] == 'No network connection' || states[networkState] == 'Unknown connection')
            return false;
        else*/
            return true;
}
function log(pagina, funcion, mensaje)
{
    console.log(pagina+"-"+funcion+"-"+mensaje);
}
/*Funcion que se encarga de obtener las variables que se envian por la url*/
function getUrlVars() 
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
/*Redirije la aplicacion a la url indicada*/
function redirigir(url)
{
    $(location).attr("href",url);
}

function imprimirObjeto(object)
{
var output = '';
for (var property in object) {
  output += property + ': ' + object[property]+'; ';
}
return output;


}
function xmlToString(xmlData) { 

    var xmlString;
    //IE
    if (window.ActiveXObject){
        xmlString = xmlData.xml;
    }
    // code for Mozilla, Firefox, Opera, etc.
    else{
        xmlString = (new XMLSerializer()).serializeToString(xmlData);
    }
    return xmlString;
}
function verificarPremiun()
{
    if(getTipo()==0)
		return true;
	else 
		return false;
}
function getMes(numero)
{
    
    numero=parseInt(numero);
    console.log("numero: "+numero);
    var meses=["","Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    
    return meses[numero];
}
function convertirFecha(fecha)
{
    console.log("Fecha: "+fecha);
    var retornar="";
    var elementos=fecha.split("-");
    var mes=getMes(elementos[1]);
    retornar=elementos[2].split(" ")[0]+"-"+mes;
    console.log("retornar: "+retornar);
    return retornar;
}

function cerrarSesion()
{
    localStorage.removeItem("idUsuario");
    redirigir("index.html");
}
//######################################### VARIABLES EN SESION #########################################
function getIdUsuario()
{
    var valor = localStorage.getItem("idUsuario");
    return valor;
}
function getEmailUsuario()
{
    var valor = localStorage.getItem("emailUsuario");
    return valor;
}
//Determina si el usuario es basico(0) o premium (1)
function getTipo()
{
    var valor = localStorage.getItem("tipoUsuario");
    if(!valor)
        valor=0;
    return valor;
}
function getClave()
{
    var valor = localStorage.getItem("claveUsuario");
    return valor;
}

function cambiarAcentos(texto)
{
    var regex = new RegExp('%20', 'g');
    texto = texto.replace(regex, ' ');
    //Url acentos minuscula
    regex = new RegExp('%C3%A1', 'g');
    texto = texto.replace(regex, '&aacute;');
    regex = new RegExp('%C3%A9', 'g');
    texto = texto.replace(regex, '&eacute;');
    regex = new RegExp('%C3%AD', 'g');
    texto = texto.replace(regex, '&iacute;');
    regex = new RegExp('%C3%B3', 'g');
    texto = texto.replace(regex, '&oacute;');
    regex = new RegExp('%C3%BA', 'g');
    texto = texto.replace(regex, '&uacute;');
    regex = new RegExp('%C3%B1', 'g');
    texto = texto.replace(regex, '&ntilde;');
    regex = new RegExp('%C3%BC', 'g');
    texto = texto.replace(regex, '&uuml;');
    
    //Url acentos mayuscula
    regex = new RegExp('%C3%81', 'g');
    texto = texto.replace(regex, '&Aacute;');
    regex = new RegExp('%C3%89', 'g');
    texto = texto.replace(regex, '&Eacute;');
    regex = new RegExp('%C3%8D', 'g');
    texto = texto.replace(regex, '&Iacute;');
    regex = new RegExp('%C3%93', 'g');
    texto = texto.replace(regex, '&Oacute;');
    regex = new RegExp('%C3%9A', 'g');
    texto = texto.replace(regex, '&Uacute;');
    regex = new RegExp('%C3%91', 'g');
    texto = texto.replace(regex, '&Ntilde;');
    regex = new RegExp('%C3%9C', 'g');
    texto = texto.replace(regex, '&Uuml;');
    
    //Acentos en minuscula
    regex = new RegExp('á', 'g');
    texto = texto.replace(regex, '&aacute;');
    regex = new RegExp('é', 'g');
    texto = texto.replace(regex, '&eacute;');
    regex = new RegExp('í', 'g');
    texto = texto.replace(regex, '&iacute;');
    regex = new RegExp('ó', 'g');
    texto = texto.replace(regex, '&oacute;');
    regex = new RegExp('ú', 'g');
    texto = texto.replace(regex, '&uacute;');
    regex = new RegExp('ñ', 'g');
    texto = texto.replace(regex, '&ntilde;');
    regex = new RegExp('ü', 'g');
    texto = texto.replace(regex, '&Uuml;');
    //Acentos en mayuscula
    regex = new RegExp('Á', 'g');
    texto = texto.replace(regex, '&Aacute;');
    regex = new RegExp('É', 'g');
    texto = texto.replace(regex, '&Eacute;');
    regex = new RegExp('Í', 'g');
    texto = texto.replace(regex, '&Iacute;');
    regex = new RegExp('Ó', 'g');
    texto = texto.replace(regex, '&Oacute;');
    regex = new RegExp('Ú', 'g');
    texto = texto.replace(regex, '&Uacute;');
    regex = new RegExp('Ñ', 'g');
    texto = texto.replace(regex, '&Ntilde;');
    regex = new RegExp('Ü', 'g');
    texto = texto.replace(regex, '&Uuml;');
    
    return texto;
    
}
function cambiarAcentos2(texto)
{
    //Acentos en minuscula
    regex = new RegExp('&aacute;', 'g');
    texto = texto.replace(regex, 'á');
    regex = new RegExp('&eacute;', 'g');
    texto = texto.replace(regex, 'é');
    regex = new RegExp('&iacute;', 'g');
    texto = texto.replace(regex, 'í');
    regex = new RegExp('&oacute;', 'g');
    texto = texto.replace(regex, 'ó');
    regex = new RegExp('&uacute;', 'g');
    texto = texto.replace(regex, 'ú');
    regex = new RegExp('&ntilde;', 'g');
    texto = texto.replace(regex, 'ñ');
    regex = new RegExp('&uuml;', 'g');
    texto = texto.replace(regex, 'ü');
    //Acentos en mayuscula
    regex = new RegExp('&Aacute;', 'g');
    texto = texto.replace(regex, 'Á');
    regex = new RegExp('&Eacute;', 'g');
    texto = texto.replace(regex, 'É');
    regex = new RegExp('&Iacute;', 'g');
    texto = texto.replace(regex, 'Í');
    regex = new RegExp('&Oacute;', 'g');
    texto = texto.replace(regex, 'Ó');
    regex = new RegExp('&Uacute;', 'g');
    texto = texto.replace(regex, 'Ú');
    regex = new RegExp('&Ntilde;', 'g');
    texto = texto.replace(regex, 'Ñ');
    regex = new RegExp('&Uuml;', 'g');
    texto = texto.replace(regex, 'Ü');
    return texto;
    
}
function openUrl(url)
{
    navigator.app.loadUrl(url, { openExternal:true });
    //window.open(url, "_blank");
}
