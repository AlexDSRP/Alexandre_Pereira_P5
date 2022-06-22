let panier = JSON.parse(localStorage.getItem("produits"));
console.log(panier);

/// fonction permettant de calculer le nbr total de produit
/// total = addition de produit.quantity
function totalQuantity() {
    let result = 0;
    let totalQty = document.querySelector("#totalQuantity");
    for (i = 0; i < panier.length; i++) {
        result = result + Number(panier[i].quantity);
    }
    totalQty.innerText = result;
}

/// fonction permettant de calculer le prix total
function totalPrice() {
    let result = 0;
    for (i = 0; i < panier.length; i++) {
        result = result + Number(panier[i].quantity) * panier[i].price;
    }
    document.querySelector("#totalPrice").innerText = result;
}

/// fonction permettant de mettre à jour la quantité
function updateQuantity() {
    let updateQty = document.querySelectorAll(".itemQuantity");
    updateQty.forEach((element) => {
        element.addEventListener("change", (e) => {
            let updateElement = e.target.closest(".cart__item");
            let DOMquantity = updateElement.querySelector(
                ".cart__item__content__settings__quantity p"
            );
            DOMquantity.innerText = "Qté : " + e.target.value;
            panier.filter((produit) => {
                if (
                    produit.id === updateElement.dataset.id &&
                    produit.colors === updateElement.dataset.color
                ) {
                    produit.quantity = e.target.value;
                    localStorage.setItem("produits", JSON.stringify(panier));
                    totalQuantity();
                    totalPrice();
                }
            });
        });
    });
}

function affichageproduit() {
    let cart__items = document.querySelector("#cart__items");

    for (i = 0; i < panier.length; i++) {
        let produit = panier[i];
        let article = document.createElement("article");
        article.setAttribute("class", "cart__item");
        article.setAttribute("data-id", produit.id);
        article.setAttribute("data-color", produit.colors);
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
        quantity.innerText = "Qté : " + produit.quantity;
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

        let buttomSupp = document.querySelectorAll(".deleteItem");
        buttomSupp.forEach((element) => {
            element.addEventListener("click", (e) => {
                let elementDelete = e.target.closest(".cart__item");
                elementDelete.remove();
                // modifier le code
                panier.filter((element) => {
                    if (
                        element.id === elementDelete.dataset.id &&
                        element.colors === elementDelete.dataset.color
                    ) {
                        let deletePro = panier.indexOf(element);
                        panier.splice(deletePro, 1);
                        localStorage.setItem(
                            "produits",
                            JSON.stringify(panier)
                        );
                        totalQuantity();
                        totalPrice();
                    }
                });
                // modifier le code
                console.log(elementDelete.dataset.id);
            });
        });
    }
}
affichageproduit();

totalQuantity();

totalPrice();

updateQuantity();

/// fonction creant le formulaire
function contact() {
    let getContact = {
        firstName: document.querySelector("#firstName").value,
        lastName: document.querySelector("#lastName").value,
        address: document.querySelector("#address").value,
        city: document.querySelector("#city").value,
        email: document.querySelector("#email").value,
    };

    let panier = JSON.parse(localStorage.getItem("produits"));
    let products = [];
    for (i = 0; i < panier.length; i++) {
        products.push(panier[i].id);
    }

    let order = { contact: getContact, products: products };

    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then(function (res) {
            if (res.ok) {
                return res.json();
            }
        })
        .then((res) => {
            localStorage.clear();
            localStorage.setItem("produits", JSON.stringify([]));
            window.location.href =
                "http://127.0.0.1:5500/front/html/confirmation.html?id=" +
                res.orderId;
        })
        .catch((error) => console.error(error));
}
function submit() {
    let form = document.querySelector(".cart__order__form");
    form.addEventListener("submit", (e) => {
        contact();
    });
}
submit();
