/*
Se encarga de mostrar informacion de la polla seleccionada
*/
var usuarios="",correos="",idBet,nombreBet;
var redireccionar=false,exitPolla=false;
var inf=0,inf2=0,inf3=0;
var onDeviceReady=function()
{
   /*var parametros=getUrlVars();
                idBet=parametros["idBet"];
                nombreBet=parametros["nombreBet"];
                getInfoBet(idBet);*/
};
		document.addEventListener("deviceready",onDeviceReady,false);

$(document).ready(
    function()
    {
        (function()
        {
              var parametros=getUrlVars();
                idBet=parametros["idBet"];
                nombreBet=parametros["nombreBet"];
                getInfoBet(idBet);
        })();
        
        $("#btninfogeneral").click(
            function(e)
            {
                e.preventDefault();
                $("#contenido1").toggle(); 
                $("#btninfogeneral :hover").css("border-radius","0px"); 
                /*if(inf==1){
                    $("#btninfogeneral").css("border-bottom-left-radius","14px");
                    $("#btninfogeneral").css("border-bottom-right-radius","14px");
                    $("#btninfogeneral :hover").css("border-bottom-left-radius","14px");
                    $("#btninfogeneral :hover").css("border-bottom-right-radius","14px");
                    $("#contenido1").toggle(); 
                    inf=0;
                }else{
                    inf=1;
                    $("#btninfogeneral").css("border-bottom-left-radius","0px");
                    $("#btninfogeneral").css("border-bottom-right-radius","0px");
                    $("#btninfogeneral :hover").css("border-bottom-left-radius","0px");
                    $("#btninfogeneral :hover").css("border-bottom-right-radius","0px");
                    $("#contenido1").toggle(); 
                }*/
            }
        );
        $("#btnparticipantes").click(
            function(e)
            {
                e.preventDefault();
                $("#contenido2").toggle(); 
                $("#btnparticipantes  :hover").css("border-radius","0px");
                /*if(inf2==1){
                    $("#btnparticipantes").css("border-bottom-left-radius","14px");
                    $("#btnparticipantes").css("border-bottom-right-radius","14px");
                    $("#btnparticipantes :hover").css("border-bottom-left-radius","14px");
                    $("#btnparticipantes :hover").css("border-bottom-right-radius","14px");
                    $("#contenido2").effect( "blind", {}, 500 ); 
                    inf2=0;
                }else{
                    inf2=1;
                    $("#btnparticipantes").css("border-bottom-left-radius","0px");
                    $("#btnparticipantes").css("border-bottom-right-radius","0px");
                    $("#btnparticipantes :hover").css("border-bottom-left-radius","0px");
                    $("#btnparticipantes :hover").css("border-bottom-right-radius","0px");
                    $("#contenido2").show( 'slide', { direction: "up" } , 500);
                }*/
            }
        );
        $("#btninvitar").click(
            function(e)
            {
                e.preventDefault();
                $("#contenido3").toggle(); 
                $("#btninvitar  :hover").css("border-radius","0px");
                /*if(inf3==1){
                    $("#btninvitar").css("border-bottom-left-radius","14px");
                    $("#btninvitar").css("border-bottom-right-radius","14px");
                    $("#btninvitar :hover").css("border-bottom-left-radius","14px");
                    $("#btninvitar :hover").css("border-bottom-right-radius","14px");
                    $("#contenido3").effect( "blind", {}, 500 ); 
                    inf3=0;
                }else{
                    inf3=1;
                    $("#btninvitar").css("border-bottom-left-radius","0px");
                    $("#btninvitar").css("border-bottom-right-radius","0px");
                    $("#btninvitar :hover").css("border-bottom-left-radius","0px");
                    $("#btninvitar :hover").css("border-bottom-right-radius","0px");
                    $("#contenido3").show( 'slide', { direction: "up" } , 500);
                }*/
            }
        );
        
        
        $("#aceptar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(redireccionar)
                    redirigir("2.html");
                if(exitPolla)
                    salirPolla(idBet,getIdUsuario());
                    
            }
        );
        $("#cancelar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                    
            }
        );
        $("#btnAgregar").click(
            function(e)
            {
                console.log("1");
                e.preventDefault();
                var nombre=$("#nombre2").val();
                var email=$("#mail").val();
                if(nombre && email)
                {
                    console.log("2");
                    if(validarEmail(email))
                    {
                        console.log("3");
                         var html="<tr>";
                            html+='<td class="user"><img src="images/user.svg"></td>';
                            html+="<td>$1</td>";
                            html+="<td>$2</td>";
                            html+="</tr>";
                            html=html.replace("$1",nombre);
                            html=html.replace("$2",email);
                        console.log("html:"+html);
                        $("#invitados2").append(html);
                        //$("#tblCorreos").append(html);
                        
                        //Agrego a los elementos
                        usuarios+="-"+nombre;
                        correos+="-"+email;
                    }else{
                        bPopUpOpen("<p>Email inválido</p>","aceptar");
                    }
                }else{
                    bPopUpOpen("<p>Niguú campo puede estar vacío</p>","aceptar");
                }
                
                
            }
        );
        $("#btnInvitar").click(
            function(e)
            {
                e.preventDefault();
                //Ahora envio una invitacion a todas las personas 
                if(usuarios && correos)
                {
                    bPopUpOpen("<p>Enviando invitaciones</p>","");
                    //Elimino el primer caracter
                    usuarios=usuarios.substring(1);
                    correos=correos.substring(1);
                    url=url_base+"bets/sendinvitation";
                    datos={
                        idBet:idBet,
                        nombreBet: nombreBet,
                        usuarios: usuarios,
                        correos: correos,
                        idioma:idioma
                    };
                    ajax(url,datos,function(xml2)
                         {
                             bPopUpOpen("<p>Un email se envío a tus familiares y amigos para que se unan a la polla "+nombreBet+"</p>","aceptar");
                             redireccionar=false;
                             //redirigir("index.html");
                         });
                }
            }
        );
        $("#btnSalir").click(
            function(e)
            {
                e.preventDefault();
                exitPolla=true;
                bPopUpOpen("<p>Estás seguro que deseas dejar de pertenecer a esta porra?</p>","aceptar-cancelar");
                
                
            }
        );
        
    }
);
function getInfoBet(idBet)
{
    bPopUpOpenCargando("<p>Obteniendo la informacion</p>","");
    var url=url_base+"bets/getinfobet.xml";
    var datos={
        idBet:idBet
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var nombres="",informacion="";
                    $("datos",xml).each(
                        function()
                        {
                            var Bet,User;
                            Bet=$(this).find("Bet");
                            User=$(this).find("User");
                            
                            nombres+="<br>"+$("nombres",User).text()+": "+ $("nick",User).text();
                            informacion="Nombre: "+$("nombre",Bet).text()+"<br>";
                            informacion+="Id: "+$("id",Bet).text()+"<br>";
                            informacion+="Premio: "+$("premio",Bet).text()+"<br>";
                            informacion+="Informacion: "+$("informacion",Bet).text();
                            nombreBet=$("nombre",Bet).text();
                            /*$("User",BetsUser).each(
                                function()
                                {
                                    nombres+="<br>"+$("nombres",this);
                                }
                            );*/
                            
                            
                        });
                    $("#conten2").html(nombres);
                    $("#conten1").html(informacion);
                    bPopUpClosed();
                        
                    
                    
                    
                }else
                {
                    console.log("El xml es nulo");
                }
             });
}

function salirPolla(idBet,idUsuario)
{
    bPopUpOpenCargando("<p>Procesando la peticion</p>","");
    var url=url_base+"bets_users/outbet.xml";
    var datos={
        idBet:idBet,
        idUsuario:idUsuario
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var res=$("datos",xml).text();
                    if(res==1)
                    {
                        redireccionar=true;
                        bPopUpOpen("<p>Haz abandonado la porra con éxito</p>","aceptar");
                    }else{
                        bPopUpOpen("<p>Haz abandonado la porra con éxito</p>","aceptar");
                    }
                }
             }
        );
}