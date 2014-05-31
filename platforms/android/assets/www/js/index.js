
$(document).ready(
            function()
            {
                  (function()
                  {
                      
                      if(!getIdUsuario())
                      {
                        redirigir("1a.html");
                      }else{
                        redirigir("2.html");
                      }
                  })();

            }

      );