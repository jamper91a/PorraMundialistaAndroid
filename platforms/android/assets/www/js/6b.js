/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var idBet,idUsuario;
var onDeviceReady=function()
{
     /*bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
                //Obtengo el destino
                var parametros=getUrlVars();
                idBet=parametros["idBet"];
                idUsuario=parametros["idUsuario"];
                if(!idUsuario)
                    idUsuario=getIdUsuario();
                getInformacion(idBet,idUsuario);*/
};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {

        (function()
        {
              bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
                //Obtengo el destino
                var parametros=getUrlVars();
                idBet=parametros["idBet"];
                idUsuario=parametros["idUsuario"];
                if(!idUsuario)
                    idUsuario=getIdUsuario();
                getInformacion(idBet,idUsuario);
        })();
        $("#miPuntaje").click(
            function(e)
            {
                e.preventDefault();
                redirigir("6b.html?idBet="+idBet);
            }
        )
    }
);

function getInformacion(idBet, idUsuario)
{
    
    var url=url_base+"forecasts/getscoresbyuser.xml";
    var datos={
        idBet:idBet,
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var acumulado=parseInt(0);
                    $("datos",xml).each(
                        function()
                        {
                            //Objetos
                            var Game,Forecast,Bet,Local,Visitante
                            //Variables:
                            var fecha,goles_local,goles_visitante,marcador_local,marcador_visitante,puntuacion,local_nombre,visitante_nombre
                            
                            Game=$(this).find("Game");
                            Forecast=$(this).find("Forecast");
                            Bet=$(this).find("Bet");
                            Local=$(this).find("Local");
                            Visitante=$(this).find("Visitante");
                            
                            fecha=$("fecha",Game).text();
                            goles_local=$("goles_local",Game).text();
                            goles_visitante=$("goles_visitante",Game).text();
                            
                            marcador_local=$("marcador_local",Forecast).text();
                            marcador_visitante=$("marcador_visitante",Forecast).text();
                            puntuacion=$("puntuacion",Forecast).text();
                            
                            local_nombre=$("nombre",Local).text();
                            
                            visitante_nombre=$("nombre",Visitante).text();
                            
                            /*var html='<table class="fechas" width="100%" border="0"><tr>';
                            html+='<th class="fechapartido" scope="col">$1</th>';
                            html+='<th class="equipos" scope="col">$2</th>';
                            html+='<th  class="pronos" scope="col">$3</th>';
                            html+='<th class="real" scope="col">$4</th>';
                            html+='<th class="punt" scope="col">$5</th>';
                            html+='<th class="total" scope="col">$6</th>';
                            html+='</tr><table>';*/
                             var html='<tr>';
                            html+='<th class="fechapartido" scope="col">$1</th>';
                            html+='<th class="equipos" scope="col">$2</th>';
                            html+='<th  class="pronos" scope="col">$3</th>';
                            html+='<th class="real" scope="col">$4</th>';
                            html+='<th class="punt" scope="col">$5</th>';
                            html+='<th class="total" scope="col">$6</th>';
                            html+='</tr>';
                            acumulado+=parseInt(puntuacion);
                            if(local_nombre)
                            {
                                html=html.replace("$1",convertirFecha(fecha));
                                html=html.replace("$2",local_nombre+"-"+visitante_nombre);
                                html=html.replace("$3",marcador_local+"-"+marcador_visitante);
                                html=html.replace("$4",goles_local+"-"+goles_visitante);
                                html=html.replace("$5",puntuacion);
                                html=html.replace("$6",acumulado);
                            }else
                            {
                                html=html.replace("$1","*");
                                html=html.replace("$2","*");
                                html=html.replace("$3","*");
                                html=html.replace("$4","*");
                                html=html.replace("$5","*");
                                html=html.replace("$6","*");
                            }
                            
                            
                            //$("#Informacion").append(html);
                            $("#tblDatos").append(html);
                        }
                    );
                    bPopUpClosed();
                    
                }
             }
        );
}