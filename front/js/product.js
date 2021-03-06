let url = window.location.search;
let urlParams = new URLSearchParams(url);
let elementId = urlParams.get("canapId");

async function products(elementId) {
    return await fetch(`http://localhost:3000/api/products/${elementId}`).then(
        (res) => res.json()
    );
}

//fonction permmetant de verifier si un produit à la même couleur et même id
function verifPanier(paramProduct) {
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
    let quantity = document.querySelector("#quantity");

    quantity.addEventListener("input", function (e) {
        // si input quantity = inferieur 0 changer valeur et mettre innerText"1"
        // si input quantity = superieur 100 changer valeur et mettre innerText "1"
        if (
            e.target.value === 0 ||
            e.target.value <= 0 ||
            e.target.value > 100
        ) {
            e.target.value = 1;
        }
    });

    button.addEventListener("click", function (e) {
        let color = colors.value;

        let input = quantity.value;

        let paramProduct = {
            colors: color,
            quantity: input,
            image: productDescript.imageUrl,
            id: productDescript._id,
            altTxt: productDescript.altTxt,
            name: productDescript.name,
        };

        // déclaration d'une variable
        let panier;

        // si input quantity = 0 alors afficher alert "ajouter une quantité" et
        // si color = ""  alert ajouter une couleur
        if (input == 0 || color == "") {
            alert("merci d'ajouter une quantité et une couleur");
        } else {
            if (localStorage.getItem("produits") === null) {
                panier = new Array();
                panier.push(paramProduct);
                localStorage.setItem("produits", JSON.stringify(panier));
            } else {
                panier = JSON.parse(localStorage.getItem("produits"));
                if (verifPanier(paramProduct) === -1) {
                    panier.push(paramProduct);
                } else {
                    let i = verifPanier(paramProduct);
                    panier[i].quantity =
                        Number(paramProduct.quantity) +
                        Number(panier[i].quantity);
                }
                localStorage.setItem("produits", JSON.stringify(panier));
            }
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
}

pageProduct();
