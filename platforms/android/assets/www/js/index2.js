var onDeviceReady=function()
{
	/*console.log("entre: "+getIdUsuario());
			    if(!getIdUsuario())
			    {
			      redirigir("1a.html");
			    }else{
			      redirigir("2.html");
			    }*/
};
		document.addEventListener("deviceready",onDeviceReady,false);

$(document).ready(
		function()
		{
			(function()
			{
				console.log("entre: "+getIdUsuario());
			    if(!getIdUsuario())
			    {
			      redirigir("1a.html");
			    }else{
			      redirigir("2.html");
			    }
			})();

		}

	);