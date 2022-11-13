let user = sessionStorage.getItem('usuario')

    if (user==null){
        alert("No estas logueado, solucionemos eso :)")
        window.location.href='login.html';
    }  

    document.getElementById('close').addEventListener('click',function(e){
        e.preventDefault();
        sessionStorage.removeItem('usuario');
        window.location.href = 'login.html';
    }) 
    
    let userNav = document.getElementById('nav-user')
        userNav.innerHTML = user

let pNom = document.getElementById('pnom')
let sNom = document.getElementById('snom')
let pApe = document.getElementById('pape')
let sApe = document.getElementById('sape')
let mail = document.getElementById('mail')
let telefono = document.getElementById('telefono')
let btnEnviar = document.getElementById('btn-enviar')
let btnFoto = document.getElementById('btn-foto')

mail.value = user


///////////////////////DESAFIATE////////////////////////////////    

function mostrarImagen(event){
    var imagenSource = event.target.result;
    var previewImage = document.getElementById('imagen');

    localStorage.setItem('Foto de Perfil', imagenSource)

    previewImage.src = imagenSource;
  }

  function procesarArchivo(event){
     var imagen = event.target.files[0];

     var lector = new FileReader();

     lector.addEventListener('load', mostrarImagen, false);

     lector.readAsDataURL(imagen);

  }

  document.getElementById('btn-foto').addEventListener('change', procesarArchivo, false)



btnEnviar.addEventListener('click', function(e){

    /////////VALIDACIONES Y ESTILOS DE ERROR/////////////////

    if(pNom.checkValidity()){
        pNom.style.border="1px solid green"
    }else{
        e.preventDefault()
        pNom.style.border="1px dashed red"
    }

    if(pApe.checkValidity()){
        pApe.style.border="1px solid green"
    }else{
        e.preventDefault()
        pApe.style.border="1px dashed red"
    }

    if(mail.checkValidity()){
        mail.style.border="1px solid green"
    }else{
        e.preventDefault()
        mail.style.border="1px dashed red"
    }

    //////////////Ahora seteo los datos nuevos///////////////

    if(pNom.checkValidity() && pApe.checkValidity() && mail.checkValidity()){
        
        localStorage.setItem('nombre', pNom.value)
        localStorage.setItem('sNombre', sNom.value)
        localStorage.setItem('apellido', pApe.value)
        localStorage.setItem('sApellido', sApe.value)
        localStorage.setItem('email', mail.value)
        localStorage.setItem('telefono', telefono.value)
        
    }

})

let newNombre = localStorage.getItem('nombre')
let newSnombre = localStorage.getItem('sNombre')
let newApellido = localStorage.getItem('apellido')
let newSapellido = localStorage.getItem('sApellido')
let newEmail = localStorage.getItem('email')
let newTelefono = localStorage.getItem('telefono')
let fotoDePerfil = localStorage.getItem('Foto de Perfil')
let previewImage = document.getElementById('imagen');

    pNom.value = newNombre
    sNom.value = newSnombre
    pApe.value = newApellido 
    sApe.value = newSapellido
    mail.value = newEmail 
    telefono.value = newTelefono
    previewImage.src = fotoDePerfil; 

