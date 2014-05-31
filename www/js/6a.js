/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var onDeviceReady=function()
{
    (function()
    {
      //Obtengo el destino
              /*idBet=getUrlVars()["idBet"];
              getInformacion(idBet,getIdUsuario());*/
    })();
};
		document.addEventListener("deviceready",onDeviceReady,false);
var idBet,urlRedireccion;
$(document).ready(
    function()
    {
        (function()
        {
              //Obtengo el destino
              idBet=getUrlVars()["idBet"];
              getInformacion(idBet,getIdUsuario());
        })();
        $("#volver").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                //redirigir(urlRedireccion);
            }
        );
        $("#premium").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(urlRedireccion)
                    redirigir(urlRedireccion);
            }
        );
        $("#btnPuntaje").click(
            function(e)
            {
                e.preventDefault();
                redirigir("6b.html?idBet="+idBet);
            }
        );
        $("#btnPosicion").click(
            function(e)
            {
                e.preventDefault();
                if(verificarPremiun())
                {
                    redirigir("6c.html?idBet="+idBet);
                }else{
                    //urlRedireccion="6c.html?idBet="+idBet;
                    urlRedireccion="7.html";
                    bPopUpOpen("<p>Para acceder a esta información debes ser usuario premium</p>","volver-premium");
                }
            }
        )
    }
);

function getInformacion(idBet, idUsuario)
{
    bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
    var url=url_base+"forecasts/getinformacion.xml";
    var datos={
        idBet:idBet,
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("Forecast",xml).each(
                        function()
                        {
                            //Variables:
                            var puntaje,posicion,total;

                            puntaje=$("puntaje",this).text();
                            posicion=$("posicion",this).text();
                            total=$("total",this).text();
                            
                            $("#posicion").text(posicion);
                            $("#puntaje").text(puntaje);
                            $("#total").text(total);
                        }
                    );
                    bPopUpClosed();
                    
                    
                }
             }
        );
}