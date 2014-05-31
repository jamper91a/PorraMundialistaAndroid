/* Se encarga de listas las estadisticas de un partido en especifico*/
var onDeviceReady=function()
{
    //Obtengo el destino
            /*var idGame=getUrlVars()["idGame"];
            getStadistics(idGame);*/
};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        
        (function()
        {
            //Obtengo el destino
            var idGame=getUrlVars()["idGame"];
            getStadistics(idGame);
        })();
    }
);

function getStadistics(idGame)
{
    bPopUpOpenCargando("<p>Obteniendo la informacion necesaria</p>","");
    var url=url_base+"stadistics/getstadistics.xml";
    var datos={
        idGame:idGame,
        idioma:idioma
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("datos",xml).each(
                        function()
                        {
                            //Objetos
                            var Stadistic,Game,Local,Visitante;
                            //Variables:
                            var informacion,fecha,local_nombre,visitante_nombre;

                            Stadistic=$(this).find("Stadistic");
                            Game=$(this).find("Game");
                            Local=$(Game).find("Local");
                            Visitante=$(Game).find("Visitante");
                            console.log("Local: "+Local);
                            informacion=$("informacion",Stadistic).text();
                            local_nombre=$("nombre",Local).text();
                            visitante_nombre=$("nombre",Visitante).text();
                            console.log("local: "+local_nombre);
                            $("#local").text(local_nombre);
                            $("#visitante").text(visitante_nombre);
                            $("#informacion").html(informacion);
                            $("#colflag" ).attr("src","images/flags/"+local_nombre+".svg")
                            $("#greflag" ).attr("src","images/flags/"+visitante_nombre+".svg")
                            
                            
                        }
                    );
                    bPopUpClosed();
                    visibilidad(animacion());
                    
                    
                }
             }
        );
}
function visibilidad(callback)
{
    $("#colflag" ).css( "visibility","visible");
    $("#greflag" ).css( "visibility","visible");
    setInterval(callback(),1500);
}
function animacion()
{
    
    $("#imgLocal" ).effect( "slide", {}, 500 );
    $("#imgVisitante" ).effect( "slide", {}, 500 );
}