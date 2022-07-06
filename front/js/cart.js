let panier = JSON.parse(localStorage.getItem("produits"));

async function getProduct(produit) {
    //le produit doit venir du fetch et pas localstorage

    return await fetch("http://localhost:3000/api/products/" + produit).then(
        (res) => res.json()
    );
}

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
    let total = 0;
    let priceDisplay = document.querySelector("#totalPrice");
    if (panier.length === 0) {
        priceDisplay.innerText = 0;
    }
    panier.forEach(async (element) => {
        const elementPrice = (await getProduct(element.id)).price;
        total = total + elementPrice * Number(element.quantity);
        priceDisplay.innerText = total;
    });
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

// cette fonction permet d'afficher les produits sur la page panier
function afficherproduit() {
    let cart__items = document.querySelector("#cart__items");

    // ceci nous permet de trier le panier par ordre alphabétique
    panier.sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
    });

    panier.forEach(async (produit) => {
        let productPrice = (await getProduct(produit.id)).price;

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
        price.innerText = productPrice + " " + "€";
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

        // variable me permettant de min max la qty
        let inputQuantity = document.querySelectorAll(".itemQuantity");
        inputQuantity.forEach((element) => {
            element.addEventListener("input", function (e) {
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
        });

        updateQuantity();

        // fonction permettant de supprimer un produit
        let buttomSupp = document.querySelectorAll(".deleteItem");
        buttomSupp.forEach((element) => {
            element.addEventListener("click", (e) => {
                let elementDelete = e.target.closest(".cart__item");
                elementDelete.remove();

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
                    }
                    totalQuantity();
                    totalPrice();
                });
            });
        });
    });
}
afficherproduit();

totalPrice();

totalQuantity();

//fonction permettant de valider le formulaire
function isFormValid(regEx, value) {
    return regEx.test(value);
}

/// fonction creant le formulaire
function sendOrder(order) {
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
// fonction permettant d'envoyer la commande
function submit() {
    let form = document.querySelector(".cart__order__form");

    form.addEventListener("submit", (e) => {
        //Eviter de rafraichir la page
        e.preventDefault();

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

        // Création des Regex
        let onlyText = new RegExp(/^\D+$/);
        let adressReg = new RegExp(/./);
        let emailReg = new RegExp(/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/);

        //Créer la condition pour valider le formulaire
        if (!isFormValid(onlyText, getContact.firstName)) {
            document.getElementById("firstNameErrorMsg").innerText =
                "Prénom invalide";
        }

        if (!isFormValid(onlyText, getContact.lastName)) {
            document.getElementById("lastNameErrorMsg").innerText =
                "Nom invalide";
        }
        if (!isFormValid(adressReg, getContact.address)) {
            document.getElementById("addressErrorMsg").innerText =
                "Adresse invalide";
        }
        if (!isFormValid(onlyText, getContact.city)) {
            document.getElementById("cityErrorMsg").innerText =
                "Ville invalide";
        }
        if (!isFormValid(emailReg, getContact.email)) {
            document.getElementById("emailErrorMsg").innerText =
                "Email Invalide";
        }
        if (
            isFormValid(onlyText, getContact.firstName) &&
            isFormValid(onlyText, getContact.lastName) &&
            isFormValid(adressReg, getContact.address) &&
            isFormValid(onlyText, getContact.city) &&
            isFormValid(emailReg, getContact.email)
        ) {
            sendOrder(order);
        }
    });
}
submit();
