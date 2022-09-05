document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });

    //-con esta funcion tomo el id close del index y cuando se hace click elimina
    //del session storage el usuario, haciendo que rediriga al login.
    //-uso session y no local para que si se cierra la ventana se borren
    //automaticamente el dato de usuario

    //por ahora en pausa el boton de cerrar sesion

    /* document.getElementById('close').addEventListener('click',function(e){
        e.preventDefault();
        sessionStorage.removeItem('usuario');
        window.location.href = 'login.html';
    }) */

    //con esto creo alerta para que si o si se loguee
    let user = sessionStorage.getItem('usuario')
    if (user==null){
       alert("No estas logueado, solucionemos eso :)")
       window.location.href='login.html';
    }

    let userNav = document.getElementById('nav-list');
    userNav.innerHTML += `

        <li class="nav-item">
            <a class="nav-link" href="sell.html">`+ user +`</a>
        </li>
    
    `
    
});