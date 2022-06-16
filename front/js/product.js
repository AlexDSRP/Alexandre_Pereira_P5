let url = window.location.search;
let urlParams = new URLSearchParams(url);
let elementId = urlParams.get("canapId");
console.log(elementId);

async function products(elementId) {
    return await fetch(`http://localhost:3000/api/products/${elementId}`).then(
        (res) => res.json()
    );
}

function listpanier(paramProduct) {
    const panier = JSON.parse(localStorage.getItem("produits"));

    for (let i = 0; i < panier.length; i++) {
        if (
            panier[i].id === paramProduct.id &&
            panier[i].colors === paramProduct.colors
        ) {
            return i;
        }
    }
    return -1;
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
        let quantity = document.querySelector("#quantity");

        let input = quantity.value;

        let color = colors.value;

        let paramProduct = {
            colors: color,
            quantity: input,
            image: productDescript.imageUrl,
            id: productDescript._id,
            altTxt: productDescript.altTxt,
            name: productDescript.name,
            price: productDescript.price,
        };

        // une déclaration d'une variable
        let panier;

        // affectation de variable
        if (localStorage.getItem("produits") === null) {
            panier = new Array();
            panier.push(paramProduct);
            localStorage.setItem("produits", JSON.stringify(panier));
        } else {
            panier = JSON.parse(localStorage.getItem("produits"));
            if (listpanier(paramProduct) === -1) {
                panier.push(paramProduct);
            } else {
                let i = listpanier(paramProduct);
                panier[i].quantity =
                    Number(paramProduct.quantity) + Number(panier[i].quantity);
            }
            localStorage.setItem("produits", JSON.stringify(panier));
        }

        /// si dans localstorage produit existe avec (meme id + meme couleur) ne pas dupliquer
        /// panier = tableau de produit
        /// ajouter produit avec panier + d'autres produits
        /// tableau permet de boucler donc supprimer, modifier un produit du tableau

        /// si panier existe
        /// produit avec mm id + mm couleur = le modifier
        /// sinon panier existe pas
        /// creer panier et ajouter le produit
    });
    console.log(productDescript);
}

pageProduct();
