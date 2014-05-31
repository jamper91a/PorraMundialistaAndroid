/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var onDeviceReady=function()
{
    /*e.preventDefault();
                var tabla=$(this).attr("grupo");
                console.log("tabla: "+tabla);
                $("#grupo"+tabla).toggle();*/
};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        (function()
        {
             partidos();
        })();
        $("#tblJuegos").on("click","#titulo",
            function(e)
            {
                e.preventDefault();
                var tabla=$(this).attr("grupo");
                console.log("tabla: "+tabla);
                $("#grupo"+tabla).toggle();
            }
        );
    }
);

function partidos()
{
    bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
    var url=url_base+"games/getgamesorderbygroup.xml";
    var datos={
    };
    ajax(url,datos,
     function(xml)
             {
                 console.log("Hay respuesta");
                if(xml!=null)
                {
                    console.log("no es nulo");
                    var posicion=parseInt(0);
                    var grupoAnterior="",html2="";
                    var posiciones=new Array();
                    $("datos",xml).each(
                        function()
                        {
                            //Objetos
                            var Game,Local,Visitante
                            //Variables:
                            var goles_local,goles_visitante,local_nombre,local_bandera,local_posicion,visitante_nombre,visitante_bandera,visitante_posicion,grupo,fecha,fase
                            
                            
                            Game=$(this).find("Game");
                            Local=$(this).find("Local");
                            Visitante=$(this).find("Visitante");
                            
                            goles_local=$("goles_local",Game).text();
                            fase=$("fase",Game).text();
                            if(!goles_local)
                                goles_local="*";
                            goles_visitante=$("goles_visitante",Game).text();
                            if(!goles_visitante)
                                goles_visitante="*";
                            fecha=$("fecha",Game).text();
                            
                            local_nombre=$("nombre",Local).text();
                            local_bandera=$("bandera",Local).text();
                            local_posicion=$("posicion",Local).text();
                            grupo=$("grupo",Local).text();
                            visitante_nombre=$("nombre",Visitante).text();
                            visitante_bandera=$("bandera",Visitante).text();
                            visitante_posicion=$("posicion",Visitante).text();
                            
                            //console.log(local_nombre+" "+local_posicion);
                            
                            
                            //posiciones[visitante_posicion]=visitante_nombre;
                            
                            //console.log("Posiciones:")
                            if(fase=="1")
                            {   
                                //var html='<table class="grupos" width="100%">';   
                                
                                
                                if( grupoAnterior!=grupo)
                                {
                                    
                                    if(grupoAnterior==""){
                                        console.log("if");
                                        html2+="<div id='titulo' grupo='$1'><h1> Grupo $1</h1></div>"+'<table id="grupo$1" width="100%" style="display:none;background:rgba(0,0,0,0.4)">';    
                                    }else{
                                        
                                        html2+="<tr>";
                                        html2+="<td>";
                                        html2+="<div><h1 style='font-size:18px;font-weight:bold;'>Posiciones</h1></div>";
                                        html2+="<table width='100%'>";
                                        html2+="<tr class='fila'><th width='50%' style='text-align:center;' >Posicion</th><th width='50%' style='text-align:center'>Equipo</th></tr>";
                                        html2+="<tr class='fila'><th width='50%' style='text-align:center;' >1</th><th width='50%' style='text-align:center;'><img src='images/flags/"+posiciones[1]+".svg' class='bandera' />"+posiciones[1]+"</th></tr>";
                                        html2+="<tr class='fila'><th width='50%' style='text-align:center;'>2</th><th width='50%' style='text-align:center;'><img src='images/flags/"+posiciones[2]+".svg' class='bandera' />"+posiciones[2]+"</th></tr>";
                                        html2+="<tr class='fila'><th width='50%' style='text-align:center;'>3</th><th width='50%' style='text-align:center'><img src='images/flags/"+posiciones[3]+".svg' class='bandera' />"+posiciones[3]+"</th></tr>";
                                        html2+="<tr class='fila'><th width='50%' style='text-align:center;'>4</th><th width='50%' style='text-align:center'><img src='images/flags/"+posiciones[4]+".svg' class='bandera' />"+posiciones[4]+"</th></tr>";
                                        
                                        html2+="</table>";
                                        
                                        html2+="</td>";
                                        html2+="</tr>";
                                        
                                        console.log("else");
                                        html2+="</table><div id='titulo' grupo='$1'><h1>Grupo $1</h1></div>"+'<table id="grupo$1" width="100%" style="display:none;background:rgba(0,0,0,0.4)">';
                                        posiciones=new Array();
                                    }
                                    
                                    //var html3="<div id='titulo'><h1>$1</h1></div>";
                                    html2=html2.replace("$1",grupo);
                                    html2=html2.replace("$1",grupo);
                                    html2=html2.replace("$1",grupo);
                                    grupoAnterior=grupo;
                                    //$("#tblJuegos").append(html3);
                                    
                                    
                                }else
                                    posiciones[local_posicion]=local_nombre;
                                //var html2='<table class="pronostico" width="100%">';
                                
                                html2+='<tr class="fila">'+
                                        '<th class="equipo1" scope="col" style="width:30%"><img  class="bandera" src="images/flags/$2.svg"  /></th>'+
                                        '<th class="cuadrito1" scope="col" style="width:15%;line-height:25px;text-align:center;">$3</th>'+
                                        '<th class="vs" scope="col" style="width:10%;line-height:20px; text-align:center;">VS</th>'+
                                        '<th class="cuadrito2" scope="col" style="width:15%;line-height:25px;text-align:center;">$4</th>'+
                                        '<th class="equipo2" scope="col" style="width:30%;text-align:center;"><img class="bandera" src="images/flags/$5.svg" /></th>'+                                        
                                        '</tr>';
                                html2+="<tr class='fila'>";
                                html2+='<th class="nombre1" scope="col" style="width:30%;text-align:center;" >$2</th>';
                                html2+="<th colspan='3' style='width:40%;text-align:center;'>-</th>";
                                html2+='<th class="nombre2" scope="col" style="width:30%;text-align:center;">$5</th>';
                                html2+="</tr>";
                                //html2+="</table>";
                                
                                
                                
                                
                                //html2=html2.replace("$1",GameId);
                                html2=html2.replace("$2",local_nombre);

                                html2=html2.replace("$2",local_nombre);
                                html2=html2.replace("$3",goles_local);
                                html2=html2.replace("$4",goles_visitante);
                                html2=html2.replace("$5",visitante_nombre);
                                html2=html2.replace("$5",visitante_nombre);

                                
                            }else{
                                var identificadorL=$("identificadorL",Game).text();
                                $("#"+identificadorL).html(local_nombre);
                                $("#img"+identificadorL).attr("src","images/flags/"+local_nombre+".svg");
                                $("#mar"+identificadorL).html(goles_local);


                                identificadorL=$("identificadorV",Game).text();
                                $("#"+identificadorL).html(visitante_nombre);
                                $("#img"+identificadorL).attr("src","images/flags/"+visitante_nombre+".svg");
                                $("#mar"+identificadorL).html("-"+goles_visitante);
                            }
                            
                        }
                    );

					html2+="<tr>";
					html2+="<td>";
					html2+="<div><h1 style='font-size:18px;font-weight:bold;'>Posiciones</h1></div>";
					html2+="<table width='100%'>";
					html2+="<tr class='fila'><th width='50%' style='text-align:center;' >Posicion</th><th width='50%' style='text-align:center'>Equipo</th></tr>";
					html2+="<tr class='fila'><th width='50%' style='text-align:center;' >1</th><th width='50%' style='text-align:center;'><img src='images/flags/"+posiciones[1]+".svg' class='bandera' />"+posiciones[1]+"</th></tr>";
					html2+="<tr class='fila'><th width='50%' style='text-align:center;'>2</th><th width='50%' style='text-align:center;'><img src='images/flags/"+posiciones[2]+".svg' class='bandera' />"+posiciones[2]+"</th></tr>";
					html2+="<tr class='fila'><th width='50%' style='text-align:center;'>3</th><th width='50%' style='text-align:center'><img src='images/flags/"+posiciones[3]+".svg' class='bandera' />"+posiciones[3]+"</th></tr>";
					html2+="<tr class='fila'><th width='50%' style='text-align:center;'>4</th><th width='50%' style='text-align:center'><img src='images/flags/"+posiciones[4]+".svg' class='bandera' />"+posiciones[4]+"</th></tr>";
					
					html2+="</table>";
					
					html2+="</td>";
					html2+="</tr>";
                    $("#tblJuegos").append(html2);
                    bPopUpClosed();
                    
                }
             }
        );
}

function segun()
{
    redirigir("segundaFase.html");
}