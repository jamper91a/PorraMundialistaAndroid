/*
    Esta pagina permite a un usuario unirse a una polla
*/

var onDeviceReady=function()
{

};
		document.addEventListener("deviceready",onDeviceReady,false);
var redireccionar=false;
$(document).ready(
    function()
    {
        $("#aceptar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(redireccionar)
                    redirigir("2.html");
            }
        );
        $("#btnUnirse").click(
            function(e)
            {
                e.preventDefault();
                //Obtengo los datos
                var nombre,id;
                nombre=$("#txtNombre").val();
                id=$("#txtCodigo").val();
                if(nombre && id)
                {
                    unirsePolla(nombre,id,getIdUsuario());
                }else{
                    //alert("Ningun campo puede estar vacio");
                    bPopUpOpen("<p>Ningún campo puede estar vacío</p>","aceptar");
                }
                
            });
        
    });





function unirsePolla(nombreBet,idBet,idUsuario)
{
    bPopUpOpenCargando("<p>Uniendome a la porra</p>","");
    var url=url_base+"bets/joinbet.xml";
    var datos={
        nombreBet:nombreBet,
        idBet:idBet,
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                 //bPopUpClosed();
                if(xml!=null)
                {
                    var r=$("datos",xml).text();
                    
                    
                    if(r=="-1")
                    {
                        bPopUpOpen("<p>Los datos no coinciden, verifica que el nombre y el código esten digitados correctamente</p>","aceptar");
                    }else if(r=="-2"){
                        redireccionar=true;
                        bPopUpOpen("<p>Ya te habias unido a esta porra</p>","aceptar");
                    }else{
                        redireccionar=true;
                        bPopUpOpen("Te has unido a la porra "+nombreBet+". Ya puedes pronosticar marcadores","aceptar");
                    }
                    
                    
                }else
                {

                }
             });
}