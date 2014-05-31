
/* This code is used to run as soon as Intel activates */
var onDeviceReady=function(){
    console.log("Que esta pasando en 7b");
};
document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function ()
    {
        (function()
        {
            
        })();

        $("#facebook").click(
            function(e)
            {
                e.preventDefault();
                var objParameters = { "picture":"http://www.ejemplosprogramacion.co/wp-content/uploads/2014/05/logoPMgrande.png", "name":"Polla Mundialista", "caption":"Polla Mundialista Android-Ios", "description":"Para este mundial, estoy preparado para jupar las pollas desde mi movil", "link":"http://www.ejemplosprogramacion.co" } 
intel.xdk.facebook.showNewsFeedDialog(objParameters); 
            }
        );
        /*$("#facebook").click(
            function(e)
            {
                e.preventDefault();
                var objParameters = { "picture":"http://fbrell.com/f8.jpg", "name":"Facebook Dialog", "caption":"This is my caption", "description":"Using Dialogs to interact with users.", "link":"http://xdk.intel.com" } 
intel.xdk.facebook.showNewsFeedDialog(objParameters); 
            }
        );*/
        $("#twitter").click(
            function(e)
            {
                /*e.preventDefault();
                alert("Lo sentimos, esta funcion aun no se ha implementado");*/
            }
        );
        $("#google").click(
            function(e)
            {
                /*e.preventDefault();
                alert("Lo sentimos, esta funcion aun no se ha implementado");*/
            }
        );
    }
);

//This allows you to post to your Facebook Wall
document.addEventListener("intel.xdk.facebook.dialog.complete",function(e) { 
  console.log("News Feed Event Returned"); 
  if (e.success == true) { 
    console.log("News feed updated successfully"); 
  } 
},false); 
