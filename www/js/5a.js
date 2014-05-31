/**
Esta pagina se encarga de listas las pollas de un usuario y dirigirlo a una pagina cuando se de clic sobre alguna polla
*/

//Variable para determinar  a que pagina ira al dar clic sobre una polla
var destino="";
var onDeviceReady=function()
{
     //Obtengo el destino
            //destino=getUrlVars()["destino"];
            //getBets(getIdUsuario());
};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        (function()
        {
            //Obtengo el destino
            destino=getUrlVars()["destino"];
            getBets(getIdUsuario());
        })();

        $("#tblPollas").on("click","tr",
            function()
            {
                var idBet=$(this).attr("idBet");
                var nombreBet=$(this).attr("nombreBet");
                redirigir(destino+".html?idBet="+idBet+"&nombreBet="+nombreBet);
            });
        
    });





function getBets(idUsuario)
{
    bPopUpOpenCargando("<p>Obteniendo elementos</p>","");
    var url=url_base+"bets_users/getbetsbyuser.xml";
    var datos={
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("datos",xml).each(
                        function()
                        {
                            
                            var obj=$(this).find("Bet");
                            var id,nombre;
                            id=$("id",obj).text();
                            nombre=$("nombre",obj).text();
                            var html="<li>";
                            html+="<a href='$1'>$2</a>";
                            html+="</li>";
                            html=html.replace("$1",destino+".html?idBet="+id+"&nombreBet="+nombre);
                            html=html.replace("$2",nombre);
                            //html=html.replace("$2",nombre);
                            $("#tblPollas").append(html);
                        });
                    bPopUpClosed();
                    
                }
             });
}