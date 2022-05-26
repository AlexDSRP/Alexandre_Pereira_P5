let url = window.location.search;
let urlParams = new URLSearchParams(url);
let elementId = urlParams.get("canapId");
console.log(elementId);

async function products(elementId) {
    return await fetch(`http://localhost:3000/api/products/${elementId}`).then(
        (res) => res.json()
    );
}
async function pageProduct() {
    const productDescript = await products(elementId);

    let item_img = document.querySelector(".item__img");
    let img = document.createElement("img");
    item_img.appendChild(img);
    img.setAttribute(`src`, productDescript.imageUrl);

    let item__content__titlePrice = document.querySelector("#title");
    item__content__titlePrice.innerText = productDescript.name;
    let price = document.querySelector("#price");
    price.innerText = productDescript.price;

    let description = document.querySelector("#description");
    description.innerText = productDescript.description;

    let colors = document.querySelector("#colors");

    for (let i = 0; i < productDescript.colors.length; i++) {
        let colorselect = document.createElement("option");
        colors.appendChild(colorselect);
        colorselect.setAttribute("productDescript", productDescript.colors[i]);
        colorselect.innerText = productDescript.colors[i];
    }

    let button = document.querySelector("button");
    button.addEventListener("click", function (e) {
        console.log("hello");

        let quantity = document.querySelector("#quantity");
        console.log(quantity);

        let input = quantity.value;
        console.log(input);

        let color = colors.value;

        console.log(color);

        let paramProduct = {
            colors: color,
            quantity: input,
            image: productDescript.imageUrl,
            id: productDescript._id,
        };
        console.log(paramProduct);

        let arrayProduct = new Array();
        const panier = JSON.parse(localStorage.getItem("produits"));

        /// si dans localstorage produit existe avec (meme id + meme couleur) ne pas dupliquer
        /// panier = tableau de produit
        /// ajouter produit avec panier + d'autres produits
        /// tableau permet de boucler donc supprimer, modifier un produit du tableau

        /// si panier existe
        /// produit avec mm id + mm couleur = le modifier
        /// sinon panier existe pas
        /// creer panier et ajouter le produit

        if (panier) {
            console.log("sheesh");
            panier.push(paramProduct);
            localStorage.setItem("produits", JSON.stringify(panier));
            for (let i = 0; i < panier.length; i++) {
                //const paramProduct2 = paramProduct;
                //const producttt= tableau[]
            }
        } else {
            arrayProduct.push(paramProduct);
            localStorage.setItem("produits", JSON.stringify(arrayProduct));
        }
    });

    console.log(productDescript);
}
pageProduct();
