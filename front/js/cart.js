let panier = JSON.parse(localStorage.getItem("produits"));
console.log(panier);

function affichageproduit() {
    let cart__items = document.querySelector("#cart__items");

    for (i = 0; i < panier.length; i++) {
        let produit = panier[i];
        console.log(produit);
        let article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", produit.id);
        article.setAttribute("data-color", produit.color);
        cart__items.appendChild(article);

        let cart__item__img = document.createElement("div");
        cart__item__img.setAttribute("class", "cart__item__img");
        article.appendChild(cart__item__img);
        let cart__img = document.createElement("img");
        cart__img.setAttribute(`src`, produit.image);
        cart__img.setAttribute("alt", produit.altTxt);
        cart__item__img.appendChild(cart__img);

        let cart__item__content = document.createElement("div");
        cart__item__content.setAttribute("class", "cart__item__content");
        article.appendChild(cart__item__content);
        let cart__item__content__description = document.createElement("div");
        cart__item__content__description.setAttribute(
            "class",
            "cart__item__content__description"
        );
        cart__item__content.appendChild(cart__item__content__description);
        let title = document.createElement("h2");
        title.innerText = produit.name;
        let color = document.createElement("p");
        color.innerText = produit.colors;
        let price = document.createElement("p");
        price.innerText = produit.price + " " + "€";
        cart__item__content__description.append(title, color, price);

        let cart__item__content__settings = document.createElement("div");
        cart__item__content__settings.setAttribute(
            "class",
            "cart__item__content__settings"
        );
        cart__item__content.appendChild(cart__item__content__settings);
        let cart__item__content__settings__quantity =
            document.createElement("div");
        cart__item__content__settings__quantity.setAttribute(
            "class",
            "cart__item__content__settings__quantity"
        );

        cart__item__content__settings.appendChild(
            cart__item__content__settings__quantity
        );
        let quantity = document.createElement("p");
        cart__item__content__settings__quantity.appendChild(quantity);
        let input = document.createElement("input");
        cart__item__content__settings__quantity.appendChild(input);
        input.setAttribute("type", "number");
        input.setAttribute("class", "itemQuantity");
        input.setAttribute("name", "itemQuantity");
        input.setAttribute("min", "1");
        input.setAttribute("max", "100");
        input.setAttribute("value", produit.quantity);

        let cart__item__content__settings__delete =
            document.createElement("div");
        cart__item__content__settings__delete.setAttribute(
            "class",
            "cart__item__content__settings__delete"
        );
        cart__item__content.appendChild(cart__item__content__settings__delete);
        let deleteItem = document.createElement("p");
        deleteItem.setAttribute("class", "deleteItem");
        cart__item__content__settings__delete.appendChild(deleteItem);
        deleteItem.innerText = "Supprimer";
    }
}
/// fonction permettant de calculer le nbr total de produit
function totalQuantity() {
    let result = 0;
    for (i = 0; i < panier.length; i++) {}
}
/// fonction permettant de calculer le prix total
affichageproduit();
