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

fetch(url)
.then(response => response.json())
.then(data =>{

    console.log(data)

    function subtotal(price, count){
        return price * count;
    }
    
    let price = data.articles[0].unitCost;
    let count = 1;

    let table = document.getElementById('table')

    table.innerHTML += `
    
    <th scope="row"><img class="img-cart" src="${data.articles[0].image}"></th>
    <th scope="row">${data.articles[0].name}</th>
    <th scope="row">${data.articles[0].currency} ${data.articles[0].unitCost}</th>
    <th scope="row"><input id="count" type="number" value="1"></th>
    <th id="subtotal" scope="row">${data.articles[0].currency} `+ subtotal(price, count) +`</th>
    
    
    `   

    let count1 = document.getElementById('count');
    count1.addEventListener('input', function(){

        console.log(count1.value)
        let subtotalCont = document.getElementById('subtotal')

        subtotalCont.innerHTML = `
        
        ${data.articles[0].currency} `+ subtotal(data.articles[0].unitCost, count1.value) +`
        
        `
    })

    let arrayCarro = []
    let idProducto = localStorage.getItem('prodID');
    arrayCarro.push(idProducto)
    console.log(arrayCarro)
    let url1 = "https://japceibal.github.io/emercado-api/products/"+idProducto+".json";
    fetch(url1)
    .then(response => response.json())
    .then(data =>{
        
        let tbody = document.getElementById('tbody')
        console.log(data.images)
        let fila = document.createElement('tr');
        tbody.appendChild(fila)
        fila.innerHTML += `
    
            <th scope="row"><img class="img-cart" src="${data.images[0]}"></th>
            <th scope="row">${data.name}</th>
            <th scope="row">${data.currency} ${data.cost}</th>
            <th scope="row"><input id="count2" type="number" value="1"></th>
            <th id="subtotal1" scope="row">${data.currency} `+ subtotal(data.cost, count1.value) +`</th>
    `  
        let count2 = document.getElementById('count2')
        count2.addEventListener('input', function(){

            let subtotalCount2 = document.getElementById('subtotal1')
            subtotalCount2.innerHTML = `
            
            ${data.currency} `+ subtotal(data.cost, count2.value) +`

            `

        })

    })

    // crea una fila y appendeala. a eso le haces inner
     
})

