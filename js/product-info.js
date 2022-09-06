let borrar = document.getElementById('borrar')
let aidi = localStorage.getItem("prodID")
console.log(aidi)

borrar.innerHTML += `
        <p>`+ aidi +`</p>
`

