const url = "https://japceibal.github.io/emercado-api/cats_products/101.json"

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


    }) 