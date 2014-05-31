

$(document).ready(
function()
{
    (function()
        {
            ingresar(getEmailUsuario(),getClave());
        })();
}
    );
function ingresar(nick,pass)
{
    bPopUpOpenCargando("Ingresando");
    //alert("nick"+nick);
    //alert("pass"+pass);
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
                                    console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);
                                    crearVariableSesion("tipoUsuario",tipo);
                                    crearVariableSesion("emailUsuario",email);
                                    
                                    
                                    //redirigir("2.html");
                                    bPopUpClosed();
                                }else{
                                    prueba=true;
                                    bPopUpOpen("<p>Aun no has verificado tu correo electronico, por favor verifícalo</p>","aceptar");
                                    var idUsuario=$("id",obj).text();
                                    console.log("IdUsuario: "+idUsuario);
                                    crearVariableSesion("idUsuario",idUsuario);
                                    
                                }
                                
                            }else{
                                bPopUpOpen("<p>Datos incorrectos</p>","aceptar");
                            }
                        });
                }
             });
}