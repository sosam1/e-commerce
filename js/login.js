document.addEventListener('DOMContentLoaded', function(){
    console.log('Se cargó el DOM')

    let user = document.getElementById('log-email');
    let pass = document.getElementById('log-pass');

    let button = document.getElementById('form-login')
    button.addEventListener('submit', function(event){
        event.preventDefault();

        if(user.value.length > 0 && pass.value.length > 0){
            sessionStorage.setItem('usuario', user.value);
            window.location.href = 'index.html'
        } else {
            event.preventDefault();

            user.style.border = '#DE1C07 solid 2px';
            user.placeholder = 'Este campo es obligatorio'
            
            pass.style.border = '#DE1C07 solid 2px';
            pass.placeholder = 'Este campo es obligatorio';

        }

    });

});