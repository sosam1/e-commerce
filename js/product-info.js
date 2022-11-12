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

let prodID = localStorage.getItem("prodID");
let URL = "https://japceibal.github.io/emercado-api/products/"+prodID+".json";
let urlComments = "https://japceibal.github.io/emercado-api/products_comments/"+prodID+".json"
let container = document.getElementById('product-container');
let cardInfo = document.getElementById('product-card');
let info = ""
let productDescription = ""
fetch(URL)
.then(response => response.json())
.then(data =>{

        let carrito = []

        function agregarAlCarrito(){

            let articulo = JSON.parse(localStorage.getItem('carrito')) || [];
            articulo = {
                cost: data.cost,
                currency: data.currency,
                images: data.images[0],
                name: data.name
            };

            carrito.push(articulo)

            let articuloString = JSON.stringify(carrito)

            localStorage.setItem("carrito", articuloString)
        }

        console.log(data.relatedProducts.length)
        productDescription += `
                <h2 class="title">${data.name}</h2>
                <hr>
                <p class="description">${data.description}</p>
                <h5 class="sold">vendidos: ${data.soldCount}</h5>
                <h2 class="currency-price">${data.currency}`+" "+`${data.cost}</h2>
                <form>
                    <button id="button" onclick="${agregarAlCarrito()}">Agregar al carrito <i class="bi bi-cart3"></i></button>
                </form>        
        `  

        /* for(let i=0; i<data.images.length; i++){
            info+=`
            <img id="img`+i+`" class="product-info-img" src="${data.images[i]}">
            `
        } */

        info += `

        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="${data.images[0]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${data.images[1]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${data.images[2]}" class="d-block w-100" alt="...">
                </div>
                <div class="carousel-item">
                    <img src="${data.images[3]}" class="d-block w-100" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
        
        `


        cardInfo.innerHTML = productDescription;
        container.innerHTML = info;

        let related = document.getElementById('related-products')
        let relatedInfo = "";
        relatedInfo += `
                <h4>Productos relacionados</h4>
        `
        for(let i=0; i<data.relatedProducts.length; i++){
            relatedInfo +=  `
                <h5>${data.relatedProducts[i].name}</h5>
                <a href=""><img id="related`+i+`" class="product-info-img" src="${data.relatedProducts[i].image}"></a>
            `
        }

        related.innerHTML = relatedInfo;
        cardInfo.appendChild(related)

        let relatedProduct0 = document.getElementById('related0');
        relatedProduct0.addEventListener('click', function(){
            localStorage.prodID = data.relatedProducts[0].id
        })
        
        let relatedProduct1 = document.getElementById('related1');
        relatedProduct1.addEventListener('click', function(){
            localStorage.prodID = data.relatedProducts[1].id
        })

    
  
        //ahora inserto los comentarios
        
fetch(urlComments)
.then(response => response.json())
.then(data =>{
            let commentTitle = document.createElement('div');
            container.appendChild(commentTitle)
            commentTitle.setAttribute('class', 'title')
            commentTitle.innerHTML = `
                <h3>Comentarios</h3>
            `

            for(let comentario of data){
                let commentContainer = ""
                
                commentContainer += `

                <div class="comment">
                   <h5><b>${comentario.user}</b> ${comentario.dateTime} <span id="${comentario.user}"></span></h5>
                   <p>${comentario.description}</p> 
                </div>

                `
                let commentInfo = document.getElementById('comments-div')
                container.appendChild(commentInfo)
                commentInfo.innerHTML += commentContainer

                for(let i=0; i<comentario.score; i++){
                    let spanStar = document.createElement('span')
                    spanStar.setAttribute('class', 'fa fa-star checked')
                    document.getElementById(`${comentario.user}`).appendChild(spanStar)
                }

                for(let i=0; i<5 - comentario.score; i++){
                    let spanStar = document.createElement('span')
                    spanStar.setAttribute('class', 'fa fa-star')
                    document.getElementById(`${comentario.user}`).appendChild(spanStar)
                }

            }

            //seccion para comentar

            let divComentar = document.createElement('div');
            container.appendChild(divComentar);


            divComentar.innerHTML =  `

                    <h3>Comentar</h3>

                    <p>Tu opinión</p>
                    <textarea id="opinion" placeholder="Escribe aquí..." class="text-area form-control"></textarea>
                    <p>Tu puntuación:</p>

                    <select id="star-comment" class="select form-control">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    </select>

                    <button id="send-button" class="send-button"type="submit">Enviar</submit>

            `
            let comentar = document.getElementById('send-button')
            comentar.addEventListener('click', function(e){
                e.preventDefault()
                // agrego 0 a las horas menores a 10
                function pad(number) {
                    let str= '' + number;
                    while (str.length < 2) {
                        str= '0' + str;
                    }
                    return str;
                } 

                function fecha(){
                    let fecha= new Date();
                    let y = fecha.getFullYear();
                    let m = fecha.getMonth();
                    let d = fecha.getDay();
                    let h = fecha.getHours();
                    let min = fecha.getMinutes();
                    let s = fecha.getSeconds();
                    return ` ${y}-${pad(m)}-${pad(d)} ${pad(h)}:${pad(min)}:${pad(s)}`
                }
               
                 
                let star = document.getElementById('star-comment').value
                let opinion = document.getElementById('opinion').value
                let comments = `
                    <div class="comment">
                    <h5><b>${user}</b>`+ fecha() + ` <span id="${user}"></span> ` + `</h5>
                    <p>${opinion}</p>
                    </div>
                `
                document.getElementById('comments-div').innerHTML += comments;
                

                for(let i=0; i<star; i++){
                    let spanStar = document.createElement('span')
                    spanStar.setAttribute('class', 'fa fa-star checked')
                    document.getElementById(`${user}`).appendChild(spanStar)
                }

                for(let i=0; i<5 - star; i++){
                    let spanStar = document.createElement('span')
                    spanStar.setAttribute('class', 'fa fa-star')
                    document.getElementById(`${user}`).appendChild(spanStar)
                }  

            })

        })        

        let cart = document.getElementById('button');
        cart.addEventListener('click', function(e){
            e.preventDefault();
            window.location.href='cart.html';
        })

        console.log(data)

       

})

