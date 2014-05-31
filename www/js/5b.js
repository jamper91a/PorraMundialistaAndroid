/**
Esta pagina se encarga de listas todos los partidos, tanto de la ronda actual, como los que ya finalizaron
Si hay partido en los que el usuario ya haya ingresao un marcado, se mostrara dicho marcador.
Tambien permite guardar los pronosticos que el cliente haga
*/

//Variable para determinar  a que pagina ira al dar clic sobre una polla
var idBet,nombreBet;
var redireccionar=false,urlRedireccion;
var onDeviceReady=function()
{
    //Obtengo el destino
            /*var parametros=getUrlVars();
            idBet=parametros["idBet"];
            nombreBet=parametros["nombreBet"];
            nombreBet=cambiarAcentos(nombreBet);
            console.log("nombreBet:"+nombreBet);
            $("#nombreBet").text(nombreBet);
            getGames(idBet,getIdUsuario());*/
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
            nombreBet=parametros["nombreBet"];
            nombreBet=cambiarAcentos(nombreBet);
            console.log("nombreBet:"+nombreBet);
            $("#nombreBet").text(nombreBet);
            getGames(idBet,getIdUsuario());
        })();
        
         $("#aceptar").click(
            function(e)
            {
                bPopUpClosed();
                if(redireccionar)
                    redirigir("2.html");
            }
         );
        $("#volver").click(
            function(e)
            {
                bPopUpClosed();
                redirigir(urlRedireccion);
            }
         );
        $("#premium").click(
            function(e)
            {
                bPopUpClosed();
                redirigir("7.html");
            }
         );
        $("#btGuardar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpOpen("<p>Almacenando los pronosticos</p>","");
                //Variables para almacenar los pronosticos
                var idGames="",idForecasts="",marcadores_local="",marcadores_visitante="";
                //Recorro cada tr de la tabla
                $("#tblJuegos tr").each(
                    function()
                    {
                        var idGame=$(this).attr("idGame");
                        var idForecast=$(this).attr("idForecast");
                        if(!idForecast)
                            idForecast="0";
                        //Ahora recorro los inputs dentro de este tr
                        var inputs=$(this).find("input[type=number]");
                        //Determino si esa fila tiene valores para pronosticar
                        
                        if(inputs.size()==2)
                        {
                            
                            var marcador_l,marcador_v;
                            marcador_l=inputs[0].value;
                            marcador_v=inputs[1].value;
                            if(marcador_l && marcador_v)
                            {
                                console.log("idGame: "+idGame);
                                console.log("idForecast: "+idForecast);
                                console.log("marcador_l: "+marcador_l);
                                console.log("marcador_v: "+marcador_v);
                                idGames+="-"+idGame;
                                idForecasts+="-"+idForecast;
                                marcadores_local+="-"+marcador_l;
                                marcadores_visitante+="-"+marcador_v;    
                            }
                            
                        }
                    }
                );
                idGames=idGames.substring(1);
                marcadores_local=marcadores_local.substring(1);
                marcadores_visitante=marcadores_visitante.substring(1);
                idForecasts=idForecasts.substring(1);
                setPronosticos(idBet,getIdUsuario(),idGames,marcadores_local,marcadores_visitante,idForecasts);
                
            }
        );
        $("#tblJuegos").on( "click","#lnkForecast",
            function(e)
            {
                var idL=$(this).attr("id");
                if(idL=="lnkForecast")
                {
                    e.preventDefault();
                    redireccionar=true;
                    //Determino si el usuario es basico o no
                    if(verificarPremiun()){
                        redirigir($(this).attr("href"));
                    }else{
                        //urlRedireccion=$(this).attr("href");
                        bPopUpOpen("<p>Para acceder a esta informaciÃ³n debes ser usuario premium</p>","volver-premium");
                    }
                }
                
                
            }
        );
        
    });

function setPronosticos(idBet,idUsuario,idGames,marcadores_local,marcadores_visitante,idForecasts)
{
    var url=url_base+"forecasts/saveforecasts.xml";
    var datos={
        idBet:idBet,
        idUsuario:idUsuario,
        idGames:idGames,
        marcadores_local:marcadores_local,
        marcadores_visitante:marcadores_visitante,
        idForecasts:idForecasts
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var re=$("datos",xml).text();
                    if(re==="ok"){
                        redireccionar=true;
                        bPopUpOpen("<p>Datos almacenados con Exito</p>","aceptar");
                    }else
                        //alert(re);
                        bPopUpOpen("<p>Lo sentimos, a ocurrido un problema al almacenar la información</p>","aceptar");
                }
             }
        );
}
/*Compara la fecha del juego con la del dia de hoy y determinar si se puede o no editar*/
function compararFechas(fechaJuego,fechaSistema)
{
    //console.log("Fecha J:"+fechaJuego);
    //console.log("Fecha S:"+fechaSistema);
    var date1 = new Date(fechaJuego);//yyyy-mm-dd format
    var date2 = new Date(fechaSistema);
    var dife=date1-date2;
    var diferencia=Math.round(dife/(1000*60));
    var diferencia1=dife/(1000*60);
    //console.log("diferencia: "+diferencia);
    //console.log("diferencia1: "+diferencia1);
    //alert("Diferencia: "+diferencia+"- dife:"+dife+"-date1:"+date1+"-date2:"+date2+"-fJ:"+fechaJuego+"-fS:"+fechaSistema);
    if(diferencia>=480)
        return true;
    return false;
}

function getGames(idBet,idUsuario)
{
    bPopUpOpenCargando("<p>Obteniendo los partidos</p>","");
    var url=url_base+"games/getgamesbyuser.xml";
    var datos={
        idBet:idBet,
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    //Variable para determinar cuando los partidos son de fechas diferentes
                    var fechaAnterior="",aux=false,aux2=false;
                    $("datos",xml).each(
                        function()
                        {
                            //Objetos que vienen
                            var Forecast,Game,Local,Visitante;
                            Forecast=$(this).find("Forecast");
                            Game=$(this).find("Game");
                            Local=$(this).find("Local");
                            Visitante=$(this).find("Visitante");
                            Stadistic=$(this).find("Stadistic");
                            //Variables
                            var GameId,GameFecha,GameLocal,GamesVisitante,LocalNombre,VisitanteNombre,ForecastLocal,ForecastVisitante,ForecastId,fechaSistema,fase;
                            GameId=$("id",Game).text();
                            GameFecha=$("fecha",Game).text();
                            GameLocal=$("goles_local",Game).text();
                            GamesVisitante=$("goles_visitante",Game).text();
                            fase=$("fase",Game).text();
                            fechaSistema=$("fechaSistema",Game).text();
                            LocalNombre=$("nombre",Local).text();
                            VisitanteNombre=$("nombre",Visitante).text();
                            ForecastLocal=$("marcador_local",Forecast).text();
                            ForecastVisitante=$("marcador_visitante",Forecast).text();
                            ForecastId=$("id",Forecast).text();
                            var html2='<table class="pronostico" width="100%">';
                            if(fase>1 && aux==false)
                            {
                                aux=true;
                                html2+='<BR><div id="titulo">'+
                                '<h1>Segunda fase</h1>'+
                                '</div>';
                                //html2+='<tr><th class="fecha">$1</th></tr>';
                                //html2=html2.replace("$1",convertirFecha(GameFecha));
                            }else if(fase==1 && aux2==false)
                            {
                                aux2=true;
                                html2+='<br><div id="titulo">'+
                                '<h1>Primera Ronda</h1>'+
                                '</div>';
                            }
                            if(GameFecha!==fechaAnterior)
                            {
                                fechaAnterior=GameFecha;
                                html2+='<tr><th class="fecha">$1</th></tr>';
                                html2=html2.replace("$1",convertirFecha(GameFecha));
                                //$("#tblJuegos").append(html);
                            }
                            //GameFecha=GameFecha.split(" ")[0];
                            //fechaSistema=fechaSistema.split(" ")[0];
                            //var html="";
                            if(compararFechas(GameFecha,fechaSistema))
                            {

                                html2+='<tr idGame="$1" idForecast="$6">'+
                                        '<th class="equipo1" scope="col" style="width:20%"><img src="images/flags/$2.svg" style="height:40px;" /></th>'+
                                        '<th class="cuadrito1" scope="col" style="width:25%;height:35px;margin-top:5px;"><input type="number" style="width:45px;" onkeypress="return isNumberKey(event)" value="$3" /></th>'+
                                        '<th class="vs" scope="col" style="width:10%">VS</th>'+
                                        '<th class="cuadrito2" scope="col" style="width:25%;height:35px;margin-top:5px;"><input type="number" style="width:45px;" onkeypress="return isNumberKey(event)" value="$4" /></th>'+
                                        '<th class="equipo2" scope="col" style="width:20%"><img src="images/flags/$5.svg" style="height:40px;" /></th>'+                                        
                                        '</tr>';
                                html2+="<tr>";
                                html2+='<th class="nombre1" scope="col" style="width:20%" >$2</th>';
                                html2+="<th colspan='3' style='width:60%'><a id='lnkForecast' href='5c.html?idGame=$7' style='font-size:12px;'>Estadística</a></th>";
                                html2+='<th class="nombre2" scope="col" style="width:20%">$5</th>';
                                html2+="</tr>";
                                html2+="</table>";
                                
                            }else{
                            }
                            html2=html2.replace("$1",GameId);
                            html2=html2.replace("$2",LocalNombre);
                            html2=html2.replace("$2",LocalNombre);
                            html2=html2.replace("$3",ForecastLocal);
                            html2=html2.replace("$4",ForecastVisitante);
                            html2=html2.replace("$5",VisitanteNombre);
                            html2=html2.replace("$5",VisitanteNombre);
                            html2=html2.replace("$6",ForecastId);
                            html2=html2.replace("$7",GameId);
                            html2=html2.replace("$7",GameId);
                            html2=html2.replace("$8",ForecastLocal);
                            html2=html2.replace("$9",ForecastVisitante);
                            
                            $("#tblJuegos").append(html2);

                        });
                        bPopUpClosed();
                    
                }
             });
}

function isNumberKey(evt)
      {
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }