/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var idBet;
var onDeviceReady=function()
{
      //Obtengo el destino
            /*var parametros=getUrlVars();
            idBet=parametros["idBet"];
            getInformacion(idBet);*/
};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        
        (function()
        {
              //Obtengo el destino
            var parametros=getUrlVars();
            idBet=parametros["idBet"];
            getInformacion(idBet);
        })();
    }
);

function getInformacion(idBet)
{
    bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
    var url=url_base+"forecasts/getscorebybet.xml";
    var datos={
        idBet:idBet
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var posicion=parseInt(0);
                    $("datos",xml).each(
                        function()
                        {
                            //Objetos
                            var b_u,u,Forecast
                            //Variables:
                            var user_id,bet_id,nick,puntaje;
                            
                            b_u=$(this).find("b_u");
                            Forecast=$(this).find("Forecast");
                            u=$(this).find("u");
                            
                            user_id=$("user_id",b_u).text();
                            bet_id=$("bet_id",b_u).text();

                            puntaje=$("puntaje",Forecast).text();
                            
                            nick=$("nick",u).text();
                            
                            //var html='<table class="resultados" width="100%" ><tr>';
                            var html='<tr>';
                            html+="<td>$1</td>";
                            html+="<td><a class='persona' href='6b.html?idBet=$2&idUsuario=$3'>$4</a></td>";
                            //html+="<td><a href='6b.html?idBet=$2&idUsuario=$3'>$4<div align='right'>l</div></a></td>";
                            //html+="<td><a href='6b.html?idBet=$2&idUsuario=$3'>l</a></td>";
                            html+="<td>$5</td>";
                            html+="</tr>";
                            //html+="</tr></table>";
                            posicion+=1;
                            html=html.replace("$1",posicion);
                            html=html.replace("$2",bet_id);
                            html=html.replace("$3",user_id);
                            html=html.replace("$4",nick);
                            html=html.replace("$5",puntaje);
                            
                            $("#datos").append(html);
                        }
                    );
                    bPopUpClosed();
                    
                }
             }
        );
}