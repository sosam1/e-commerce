document.addEventListener('DOMContentLoaded', function(){
    console.log('Se cargó el DOM')

    let user = document.getElementById('log-email');
        user.addEventListener('keypress', function(){
        });
    
    let pass = document.getElementById('log-pass');
        pass.addEventListener('keypress', function(){
        });
    
    let alert = "";    

    let button = document.getElementById('loginButton')
    button.addEventListener('click', function(event){
        
        if(user.value.length > 0 && pass.value.length > 0){
            event.preventDefault();
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