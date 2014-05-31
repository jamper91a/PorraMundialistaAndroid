var onDeviceReady=function()
{

};
        document.addEventListener("deviceready",onDeviceReady,false);
var prueba=false;
$(document).ready(
    function()
    {
        $("#aceptar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(prueba)
                    redirigir("2.html");
            }
        );
        $("#btnRecordar").click(
            function(e)
            {
                e.preventDefault();
                var url=$(this).attr("href");
				openUrl(url);
            }
        );
        $("#btnIngresar").click(
            function(e)
            {
                e.preventDefault();
                //Obtengo los datos
                var nick,email,pass;
                nick=$("#txtNick").val();
                pass=$("#txtClave").val();
                if(nick && pass)
                {
                    if(validarEmail(nick))
                        ingresar(nick,pass);
                    else
                        bPopUpOpen("<p>Email invalido</p>","aceptar");
                }else{
                    bPopUpOpen("<p>Nigun campo puede estar vacio</p>","aceptar");
                }
                
            });
        
    });

function ingresar(nick,pass)
{

    bPopUpOpenCargando("Ingresando");
    var url=url_base+"users/login.xml";
    var datos={
        nick:nick,
        pass:pass
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("datos",xml).each(
                        function()
                        {
                            var obj=$(this).find("User");
                            console.log("obj.size: "+obj.size());
                            if(obj!= null && obj.size()>0)
                            {
                                var confirmado=$("confirmado",obj).text();
                                if(confirmado=="1")
                                {
                                    var idUsuario=$("id",obj).text();
                                    var tipo=$("tipo",obj).text();
                                    var email=$("email",obj).text();
                                    var clave=$("password",obj).text();
                                    console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);
                                    crearVariableSesion("tipoUsuario",tipo);
                                    crearVariableSesion("emailUsuario",email);
                                    crearVariableSesion("claveUsuario",clave);
                                    if(tipo==0)
                                        redirigir("2.html");
                                    else
                                        redirigir("7.html");
                                }else{
                                    prueba=false;
                                    bPopUpOpen("<p>Aun no has verificado tu correo electronico, por favor verifícalo</p>","aceptar");
                                    var idUsuario=$("id",obj).text();
                                    /*console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);*/
                                    
                                }
                                
                            }else{
                                bPopUpOpen("<p>Datos incorrectos</p>","aceptar");
                            }
                        });
                }
             });
}
function recuperar(nick)
{

    bPopUpOpenCargando("Ingresando");
    var url=url_base+"users/login.xml";
    var datos={
        nick:nick
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("datos",xml).each(
                        function()
                        {
                            var obj=$(this).find("User");
                            console.log("obj.size: "+obj.size());
                            if(obj!= null && obj.size()>0)
                            {
                                var confirmado=$("confirmado",obj).text();
                                if(confirmado=="1")
                                {
                                    var idUsuario=$("id",obj).text();
                                    var tipo=$("tipo",obj).text();
                                    var email=$("email",obj).text();
                                    var clave=$("password",obj).text();
                                    console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);
                                    crearVariableSesion("tipoUsuario",tipo);
                                    crearVariableSesion("emailUsuario",email);
                                    crearVariableSesion("claveUsuario",clave);
                                    if(tipo==0)
                                        redirigir("2.html");
                                    else
                                        redirigir("7.html");
                                }else{
                                    prueba=false;
                                    bPopUpOpen("<p>Aun no has verificado tu correo electronico, por favor verifícalo</p>","aceptar");
                                    var idUsuario=$("id",obj).text();
                                    /*console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);*/
                                    
                                }
                                
                            }else{
                                bPopUpOpen("<p>Datos incorrectos</p>","aceptar");
                            }
                        });
                }
             });
}