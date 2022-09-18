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

let borrar = document.getElementById('borrar');
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

        productDescription += `
                <h2 class="title">${data.name}</h2>
                <hr>
                <p class="description">${data.description}</p>
                <h5 class="sold">vendidos: ${data.soldCount}</h5>
                <h2 class="currency-price">${data.currency}`+" "+`${data.cost}</h2>
                <form>
                    <button id="button">Agregar al carrito <i class="bi bi-cart3"></i> </button>
                </form>        
        `  
        

        for(let i=0; i<data.images.length; i++){
            info+=`
            <img id="img`+i+`" class="product-info-img" src="${data.images[i]}">
            `
        }

        cardInfo.innerHTML = productDescription;
        container.innerHTML = info;


        
        //ahora inserto los comentarios
        
fetch(urlComments)
.then(response => response.json())
.then(data =>{
                

            for(let comentario of data){
                let commentContainer = `

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
})

