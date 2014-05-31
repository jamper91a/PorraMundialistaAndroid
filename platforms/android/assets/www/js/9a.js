/**
Esta pagina se encarga de listas las pollas de un usuario y dirigirlo a una pagina cuando se de clic sobre alguna polla
*/

//Variable para determinar  a que pagina ira al dar clic sobre una polla
var destino="9b";
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
            //destino=getUrlVars()["destino"];
            getBets(getIdUsuario());

        })();
        $("#tblPollas").on("click","tr",
            function()
            {
                var idBet=$(this).attr("idBet");
                var nombreBet=$(this).attr("nombreBet");
                redirigir(destino+".html?idBet="+idBet+"&nombreBet"+nombreBet);
            });
        
    });





function getBets(idUsuario)
{
    bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
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
                            if(id && nombre)
                            {
                                var html="<li>";
                                html+="<a href='$1'><div align='left'>$2</div><div align='right' style='margin-top:-17px;'>Cod:$2</div></a>";
                                html+="</li>";
                                html=html.replace("$1","9b.html?idBet="+id+"&nombreBet"+nombre);
                                html=html.replace("$2",nombre);
                                html=html.replace("$2",id);
                                //html=html.replace("$2",nombre);
                                $("#tblPollas").append(html);
                            }
                            
                        });
                    bPopUpClosed();
                }
             });
}