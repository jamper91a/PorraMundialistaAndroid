/* Se encarga de obtener informacion del usuario en la polla, como el puntaje, la posicion*/
var idBet;
var bien=false;
var onDeviceReady=function()
{
bPopUpOpenCargando("");
init();
    /*console.log("Di clic en premium");
                e.preventDefault();
                oneTouchPurchase();*/
};
        document.addEventListener("deviceready",onDeviceReady,false);
$(document).ready(
    function()
    {
		(function()
		{
			//init();
		})();

        $("#btnPremiun").click(
            function(e)
            {
                console.log("Di clic en premium");
                e.preventDefault();
                //oneTouchPurchase();
				// make the purchase
				//init();
				buy();
                //inappbilling.buy(successHandler, errorHandler,"adquirirPremium");
            }
        );
        $("#aceptar").click(
            function(e)
            {
                bPopUpClosed();
                if(bien)
                    redirigir("2.html");
            }
        );
    }
);

function successHandler (result) {
                var strResult = "";
                if(typeof result === 'object') {
                    strResult = JSON.stringify(result);
                } else {
                    strResult = result;
                }
                //alert("SUCCESS: \r\n"+strResult );
				console.log("SUCCESS: \r\n"+strResult );
				bPopUpClosed();
            }
function successHandler2 (result) {
                /*var strResult = "";
                if(typeof result === 'object') {
                    strResult = JSON.stringify(result);
                } else {
                    strResult = result;
                }
                alert("SUCCESS: \r\n"+strResult );
				alert("Excelente ahora sera premium");*/
				premium(getIdUsuario());
            }

            function errorHandler (error) {
                //alert("ERROR: \r\n"+error );
				bPopUpOpen("Error: "+error,"aceptar");
            }

            // Click on init button
            function init(){
                // Initialize the billing plugin
                inappbilling.init(successHandler, errorHandler, {showLog:true});
				//bPopUpClosed();
				//buy();
            }

            // Click on purchase button
            function buy(){
                // make the purchase
                inappbilling.buy(successHandler2, errorHandler,"adquirirpremium");

            }

            // Click on ownedProducts button
            function ownedProducts(){
                // Initialize the billing plugin
                inappbilling.getPurchases(successHandler, errorHandler);

            }

            // Click on Consume purchase button
            function consumePurchase(){

                inappbilling.consumePurchase(successHandler, errorHandler, "gas");
            }

            // Click on subscribe button
            function subscribe(){
                // make the purchase
                inappbilling.subscribe(successHandler, errorHandler,"infinite_gas");

            }

            // Click on Query Details button
            function getDetails(){
                // Query the store for the product details
                inappbilling.getProductDetails(successHandler, errorHandler, ["gas","infinite_gas"]);

            }

            // Click on Get Available Products button
            function getAvailable(){
                // Get the products available for purchase.
                inappbilling.getAvailableProducts(successHandler, errorHandler);

            }

function premium(id)
{
    bPopUpOpenCargando("");
    var url=url_base+"users/premium.xml";
    var datos={
        idUsuario:id
    };
    ajax(url,datos,
     function(xml)
             {
                if(xml!=null)
                {
                    var re=$("datos",xml).text();
                    
                    if(re="ok")
                    {
                        bien=true;
                        bPopUpOpen("<p> Actualizacion realizada con exito</p>","aceptar");
						//redirigir("2.html");
                        
                    }else
                    {
                        bPopUpOpen("<p>Ocurrio un error","aceptar");
                    }
                    
                }
                 
             });
}