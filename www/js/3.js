/*
Esta pagina permite crear una polla y enviar una invitacion por email a los usuarios seleccionados
*/
var usuarios="",correos="",redireccionar=false;
var onDeviceReady=function()
{

};
		document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
        $("#aceptar").click(
            function(e)
            {
                e.preventDefault();
                bPopUpClosed();
                if(redireccionar)
                    redirigir("2.html");
                
            });
        $("#btCrear").click(
            function(e)
            {
                e.preventDefault();
                //Obtengo los datos
                var nombre,premio,informacion,administrador;
                nombre=$("#txtNombre").val();
                premio=$("#txtPremio").val();
                informacion=$("#txtInformacion").html();
                administrador=obtenerVariable("idUsuario");
                if(nombre && premio && informacion && administrador)
                {
                    crearPolla(nombre,premio,informacion,administrador)
                }else{
                    bPopUpOpen("<p>Ningún campo puede estar vacío</p>","aceptar");
                }
                
            });
        $("#btnAgregarInvitacion").click(
            function(e)
            {
                e.preventDefault();
                var nombre,email;
                nombre=$("#txtNombreInvitado").val();
                email=$("#txtEmailInvitado").val();
                if(nombre && email){
                    agregarInvitacion(nombre,email);
                    $("#txtNombreInvitado").val("");
                    $("#txtEmailInvitado").val("");
                }else
                    bPopUpOpen("<p>Ningún campo puede estar vacío</p>","aceptar");
            });
        $("#txtEmailInvitado, #txtNombreInvitado").focus(
            function()
            {
                //$(this).val("");
                
            });
        
    });



function agregarInvitacion(nombre, email)
{
    if(validarEmail(email))
    {
        //Genero el codigo html
        var html="<tr>";
        html+='<td class="user"><img src="images/user.svg"></td>';
        html+="<td>$1</td>";
        html+="<td>$2</td>";
        html+="</tr>";
        html=html.replace("$1",nombre);
        html=html.replace("$2",email);
        //Agrego  LA TABLA
        $("#invitados").prepend(html);
        //Agrego a los elementos
        usuarios+="-"+nombre;
        correos+="-"+email;
    }else{
        bPopUpOpen("<p>Email no válido</p>","aceptar");
    }
    
}

function crearPolla(nombre,premio,informacion,administrador)
{
    var url=url_base+"bets/add.xml";
    var datos={
        nombre:nombre,
        premio:premio,
        informacion:informacion,
        administrador:administrador
    };
    bPopUpOpenCargando("Creando polla");
    ajax(url,datos,
     function(xml)
             {
                
                if(xml!=null)
                {
                    
                    var obj=$(xml).find("datos");
                    var idBet=$("codigo",obj).text();
					if(parseInt(idBet)>0)
					{
						console.log("id: "+idBet);
						//Ahora envio una invitacion a todas las personas 
						if(usuarios && correos)
						{
							//bPopUpOpenCargando("Enviando invitaciones");
							//Elimino el primer caracter
							usuarios=usuarios.substring(1);
							correos=correos.substring(1);
							url=url_base+"bets/sendinvitation2.xml";
							datos={
								idBet:idBet,
								nombreBet: nombre,
								usuarios: usuarios,
								correos: correos,
								idioma:idioma,
								idUsuario:getIdUsuario()
							};
							ajax(url,datos,function(xml2)
								 {
									 var obj2=$(xml2).find("datos");
                                     var codigo2=$("codigo",obj).text();
                                     if(parseInt(codigo2)==0)
                                     {
                                         redireccionar=true;
                                         var mens2="<p>"+nombre+ " creada con éxito, un email se envio a tus familiares y amigos para que se unan</p>";
                                         bPopUpOpen(mens2,"aceptar");
                                     }else{
                                         var mens2=$("mensaje",obj).text();
                                         bPopUpOpen("<p>"+mens2+"</p>","aceptar");
                                     }
									 
									 
								 });
						}else{
							redireccionar=true;
							var mens="<p>"+nombre+ " creada con éxito.</p>";
							bPopUpOpen(mens,"aceptar");
						}
					}else{
						var mens=$("mensaje",obj).text();
						bPopUpOpen("<p>"+mens+"</p>","aceptar");
					}
                    
                    
                    
                }else
                {

                }
             });
}