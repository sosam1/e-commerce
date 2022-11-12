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

const url = "https://japceibal.github.io/emercado-api/user_cart/25801.json"
const products_api = PRODUCT_INFO_URL + localStorage.getItem('prodID') + EXT_TYPE
fetch(url)
.then(response => response.json())
.then(data =>{

    function subtotal(price, count){
        return price * count;
    }
    
    let subtotalTotal = 0

    let price = data.articles[0].unitCost;
    let count = 1;

    let table = document.getElementById('table')

    table.innerHTML += `
    
    <th scope="row"><img class="img-cart" src="${data.articles[0].image}"></th>
    <th scope="row">${data.articles[0].name}</th>
    <th scope="row">${data.articles[0].currency} ${data.articles[0].unitCost}</th>
    <th scope="row"><input id="count" type="number" value="1"></th>
    <th id="subtotal" scope="row">${data.articles[0].currency} `+ subtotal(price, count) +`</th>
    <th scope="row"><button class="btn btn-outline-danger delete"><i class="bi bi-trash3"></i></button></th>
    `   

    subtotalTotal += subtotal(price, count)

    let count1 = document.getElementById('count');
    count1.addEventListener('input', function(){

        console.log(count1.value)
        let subtotalCont = document.getElementById('subtotal')

        subtotalCont.innerHTML = `
        
        ${data.articles[0].currency} `+ subtotal(data.articles[0].unitCost, count1.value) +`
        
        `
    })
    
    let carrito = JSON.parse(localStorage.getItem('carrito'))
    console.log(carrito)
    let tbody = document.getElementById('tbody')
        let fila = document.createElement('tr');
        tbody.appendChild(fila)

    for(let i=0; i<=carrito.length; i++){
        price = carrito[i].cost
        fila.innerHTML += `

            <th scope="row"><img class="img-cart" src="${carrito[i].images}"></th>
            <th scope="row">${carrito[i].name}</th>
            <th scope="row">${carrito[i].currency} ${carrito[i].cost}</th>
            <th scope="row"><input id="count2" type="number" value="1"></th>
            <th id="subtotal1" scope="row">${carrito[i].currency} `+ subtotal(price, count) +`</th>
            <th scope="row"><button class="btn btn-outline-danger delete"><i class="bi bi-trash3"></i></button></th>
    `   

    let count2 = document.getElementById('count2')
        count2.addEventListener('input', function(){

            let subtotalCount2 = document.getElementById('subtotal1')
            subtotalCount2.innerHTML = `
            
            ${carrito[i].currency} `+ subtotal(carrito[i].cost, count2.value) +`

            `

        })

        if(carrito[i].currency === "UYU"){
            let valorEnDolares = Math.round((carrito[i].cost/41))
            subtotalTotal += valorEnDolares
        }else{
            subtotalTotal += subtotal(price,count2.value)
        }
        
        localStorage.setItem('valorS', JSON.stringify(subtotalTotal))
    }

    
    
    
})

let modal = document.getElementById('modal')        
let seleccionar = document.getElementById('modal-open')
let save = document.getElementById('save-button')

seleccionar.addEventListener('click',function(){
    modal.classList.remove('modal');
})

save.addEventListener('click',function(){
    modal.classList.add('modal');
})

let credito = document.getElementById('credito')
let banco = document.getElementById('banco')

let inputNumCard = document.getElementById('num-card')
let inputCod = document.getElementById('cod-seg')
let inputVto = document.getElementById('vto')

let inputNumCuenta = document.getElementById('num-cuenta')

credito.addEventListener('click', function(){
    inputNumCuenta.disabled = true;
    inputNumCard.disabled = false;
    inputCod.disabled = false;
    inputVto.disabled = false;
})

banco.addEventListener('click', function(){
    inputNumCuenta.disabled = false;
    inputNumCard.disabled = true;
    inputCod.disabled = true;
    inputVto.disabled = true;
})

let comprar = document.getElementById('comprar')
comprar.addEventListener('click', function(e){
    
    let mensajeErrorenvio = document.getElementById('mensaje-envio')
    let mensajeErrorCalle = document.getElementById('calle')
    let mensajeErrorNumero = document.getElementById('numero')
    let mensajeErrorEsquina = document.getElementById('esquina') 
    let mensajeErrorModal = document.getElementById('mensaje-modal')

    if(envio.checkValidity()){
        mensajeErrorenvio.innerHTML = ""
    }else{
        mensajeErrorenvio.style.color="red"
        mensajeErrorenvio.innerHTML = "Debe seleccionar un tipo de envio"
    }

    if(mensajeErrorCalle.checkValidity()){
        mensajeErrorCalle.style.border="1px solid green"
    }else{
        mensajeErrorCalle.style.border="1px dashed red"
    }

    if(mensajeErrorNumero.checkValidity()){
        mensajeErrorNumero.style.border="1px solid green"
    }else{
        mensajeErrorNumero.style.border="1px dashed red"
    }

    if(mensajeErrorEsquina.checkValidity()){
        mensajeErrorEsquina.style.border="1px solid green"
    }else{
        mensajeErrorEsquina.style.border="1px dashed red"
    }

    ///////////////////////modal validaciones/////////////////

    let mensajeErrorNumCard = document.getElementById('num-card')
    let mensajeErrorCodSeg = document.getElementById('cod-seg')
    let mensajeErrorVto = document.getElementById('vto')
    let mensajeErrorNumCuenta = document.getElementById('num-cuenta')

    if(credito.checkValidity()){
        mensajeErrorModal.innerHTML = ""
    }else{
        mensajeErrorModal.innerHTML = "Debe seleccionar un metodo de pago"
        mensajeErrorModal.style.color="red"
    }

    if(credito.checked){
        if(mensajeErrorNumCard.checkValidity()){
            mensajeErrorNumCard.style.border="1px solid green"
        }else{
            mensajeErrorNumCard.style.border="1px dashed red"
        }

        if(mensajeErrorCodSeg.checkValidity()){
            mensajeErrorCodSeg.style.border="1px solid green"
        }else{
            mensajeErrorCodSeg.style.border="1px dashed red"
        }

        if(mensajeErrorVto.checkValidity()){
            mensajeErrorVto.style.border="1px solid green"
        }else{
            mensajeErrorVto.style.border="1px dashed red"
        }

    }else{
        if(banco.checked){
            if(mensajeErrorNumCuenta.checkValidity()){
                mensajeErrorNumCuenta.style.border="1px solid green"
            }else{
                mensajeErrorNumCuenta.style.border="1px dashed red"
            }
        }
    }

})

function pagoExito(){
    let mensaje = document.getElementById('mensajeExito')
    mensaje.hidden = false
    
}

/////////////////////////subtotales y calculos///////////////

////ya tengo el valor en el local storage, ahora simplemente lo traigo :)////

let subtotalLocal = JSON.parse(localStorage.getItem('valorS'))
console.log(subtotalLocal)
let subtotalEntrada = document.getElementById('subtotal-costo')
subtotalEntrada.innerHTML = "USD " +`${subtotalLocal}`
let precioFinalEntrada = document.getElementById('costo-total')
let precioFinal = 0
precioFinal += subtotalLocal

let costoEnvioEntrada = document.getElementById('costo-envio')

envio.addEventListener('click', function(){

    let costoEnvio =  Math.round(subtotalLocal * 0.15)
    costoEnvioEntrada.innerHTML = "USD " + `${costoEnvio}`
    let precioFinal = 0
    precioFinal += subtotalLocal
    precioFinal += costoEnvio
    precioFinalEntrada.innerHTML = precioFinal
})

let envioExpress = document.getElementById('express')
envioExpress.addEventListener('click', function(){

    let costoEnvio =  Math.round(subtotalLocal * 0.07)
    costoEnvioEntrada.innerHTML = "USD " + `${costoEnvio}`
    let precioFinal = 0
    precioFinal += subtotalLocal
    precioFinal += costoEnvio
    precioFinalEntrada.innerHTML = precioFinal
})

let envioStandar = document.getElementById('standar')

envioStandar.addEventListener('click', function(){

    let costoEnvio =  Math.round(subtotalLocal * 0.05)
    costoEnvioEntrada.innerHTML = "USD " + `${costoEnvio}`
    let precioFinal = 0
    precioFinal += subtotalLocal
    precioFinal += costoEnvio
    precioFinalEntrada.innerHTML = precioFinal

})

