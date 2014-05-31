var onDeviceReady=function()
{
    checkInternet();
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
                
            }
        );
        $("#btContinuar").click(
            function(e)
            {
                e.preventDefault();
                //Determino si el check box esta seleccionado
               if($('#chkAcepto').is(':checked'))
               {
                   redirigir("1b.html");
               }else{
                   //alert("Lo sentimos, debes aceptar los terminos y condiciones");
                   bPopUpOpen("<p>Debes aceptar los términos y condiciones para continuar</p>","aceptar");
               }
            }
        );
        
    }
);