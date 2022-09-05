let cat = localStorage.getItem("catID")
const url = "https://japceibal.github.io/emercado-api/cats_products/"+cat+".json"
    fetch(url)
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        console.log(data.products[0]);

        let divList = document.getElementById('category-products')

        for(i=0; i<data.products.length; i++){

            console.log(data.products[i].name)

            divList.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="`+data.products[i].image+`" class="img-thumbnail">
                    </div>
                    <div class="col-8">
                    <h4>${data.products[i].name} - ${data.products[i].currency}
                        ${data.products[i].cost}</h4> 
                    <p> ${data.products[i].description}</p>
                    </div>
                    <div class="col d-flex w-100 justify-content-between">
                        <small class="text-muted">${data.products[i].soldCount} Vendidos</small>
                    </div>
            ` 
        }

        let price = document.getElementById('price')
        let relev = document.getElementById('relevance')
        let arrayProduct = data.products;

        //ordeno por precio
        price.addEventListener('click', function(){

            arrayProduct = arrayProduct.sort(function(a, b){

                if(a.cost < b.cost){
                    return -1;
                }
                if(a.cost > b.cost){
                    return 1;
                }
                    return 0;
            })

            divList.innerHTML = " "

            for(i=0; i<arrayProduct.length; i++){

            divList.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="`+arrayProduct[i].image+`" class="img-thumbnail">
                    </div>
                    <div class="col-8">
                    <h4>${arrayProduct[i].name} - ${arrayProduct[i].currency}
                        ${arrayProduct[i].cost}</h4> 
                    <p> ${arrayProduct[i].description}</p>
                    </div>
                    <div class="col d-flex w-100 justify-content-between">
                        <small class="text-muted">${arrayProduct[i].soldCount} Vendidos</small>
                    </div>
            ` 
            }
        })
        // ahora ordeno por relevancia
        relev.addEventListener('click', function(){

            arrayProduct = arrayProduct.sort(function(a, b){

                if(a.soldCount > b.soldCount){
                    return -1;
                }
                if(a.soldCount < b.soldCount){
                    return 1;
                }
                    return 0;
            })

            divList.innerHTML = " "

            for(i=0; i<arrayProduct.length; i++){

            divList.innerHTML += `
            <div class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="`+arrayProduct[i].image+`" class="img-thumbnail">
                    </div>
                    <div class="col-8">
                    <h4>${arrayProduct[i].name} - ${arrayProduct[i].currency}
                        ${arrayProduct[i].cost}</h4> 
                    <p> ${arrayProduct[i].description}</p>
                    </div>
                    <div class="col d-flex w-100 justify-content-between">
                        <small class="text-muted">${arrayProduct[i].soldCount} Vendidos</small>
                    </div>
            ` 
            }

        })
        //filtro por rango
        let filter = document.getElementById('btnFiltro');
        let newFilter = []

        filter.addEventListener('click', function(){

        let min = document.getElementById('min').value;
        let max = document.getElementById('max').value;
        console.log(min)
        console.log(max)
        newFilter = arrayProduct.filter(function(product){

                if(min !== "" && min !== undefined){
                    min = min;
                }else{
                    min = -Infinity;
                }

                if(max !== "" && max !== undefined){
                    max = max;
                }else{
                    max = Infinity;
                }
            
                if(product.cost > min && 
                   product.cost < max){
                        return true;
                    } 
                        return false;

           })   

           divList.innerHTML = " "

                    for(i=0; i<newFilter.length; i++){

                    divList.innerHTML += `
                    <div class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="`+newFilter[i].image+`" class="img-thumbnail">
                            </div>
                            <div class="col-8">
                            <h4>${newFilter[i].name} - ${newFilter[i].currency}
                                ${newFilter[i].cost}</h4> 
                            <p> ${newFilter[i].description}</p>
                            </div>
                            <div class="col d-flex w-100 justify-content-between">
                                <small class="text-muted">${newFilter[i].soldCount} Vendidos</small>
                            </div>
                    ` 
                    }

                    // boton de limpiar
                    let clean = document.getElementById('clean');
                    clean.addEventListener('click', function(){
                       
                        arrayProduct = arrayProduct.sort(function(a, b){

                            if(a.cost < b.cost){
                                return -1;
                            }
                            if(a.cost > b.cost){
                                return 1;
                            }
                                return 0;
                        })
            
                        divList.innerHTML = " "
            
                        for(i=0; i<arrayProduct.length; i++){
            
                        divList.innerHTML += `
                        <div class="list-group-item list-group-item-action">
                            <div class="row">
                                <div class="col-3">
                                    <img src="`+arrayProduct[i].image+`" class="img-thumbnail">
                                </div>
                                <div class="col-8">
                                <h4>${arrayProduct[i].name} - ${arrayProduct[i].currency}
                                    ${arrayProduct[i].cost}</h4> 
                                <p> ${arrayProduct[i].description}</p>
                                </div>
                                <div class="col d-flex w-100 justify-content-between">
                                    <small class="text-muted">${arrayProduct[i].soldCount} Vendidos</small>
                                </div>
                        ` 
                        }
                       
                    })
        })

    }) 