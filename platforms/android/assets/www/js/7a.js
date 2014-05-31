var onDeviceReady=function()
{
    getRedes();
};
		document.addEventListener("deviceready",onDeviceReady,false);

$(document).ready(
    function()
    {
        (function()
        {
            //getRedes();
        })();
        $("#btninfogeneral").click(
            function(e)
            {
                e.preventDefault();
                $("#contenido1").toggle();
            }
        );
        $("#lnkFacebook").click(
            function(e)
            {
                e.preventDefault();
                console.log("Face");
                console.log("Url: "+$(this).attr("url"));
                openUrl($(this).attr("url"));
            }
        );
        $("#lnkTwitter").click(
            function(e)
            {
                e.preventDefault();
                console.log("Face");
                //alert("Url: "+$(this).attr("url"));
                openUrl($(this).attr("url"));
            }
        );
        $("#btnparticipantes").click(
            function(e)
            {
                e.preventDefault();
                $("#contenido2").toggle();
            }
        );
        $("#btnTerminos").click(
            function(e)
            {
                e.preventDefault();
                console.log("Me la pela esto 3");
                redirigir("7d.html");
            }
        );
        
        
    }
);

function getRedes()
{
    bPopUpOpenCargando("");
    var url=url_base+"options/getsocialnetworks.xml";
    var datos={
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    $("datos",xml).each(
                        function()
                        {
                            var Option;
                            Option=$(this).find("Option");
                            var url=$("identificador",Option).text();
                            var nombre=$("nombre",Option).text();
                            $("#lnk"+nombre).attr("url",url);
                        }
                    );
                    bPopUpClosed();
                    
                }
                 
             });
}