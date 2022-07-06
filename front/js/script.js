var tableau;
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        tableau = value;
        for (let i = 0; i < value.length; i++) {
            let sectionItems = document.getElementById("items");
            let createProduct = document.createElement("a");
            createProduct.setAttribute(
                "href",
                `product.html?canapId=${value[i]._id}`
            );
            sectionItems.appendChild(createProduct);
            let article = document.createElement("article");
            createProduct.appendChild(article);

            let img = document.createElement("img");
            img.setAttribute("src", value[i].imageUrl);
            img.setAttribute("alt", value[i].altTxt);
            article.appendChild(img);

            let productName = document.createElement("h3");
            productName.setAttribute("class", "productName");
            productName.innerText = value[i].name;
            article.appendChild(productName);

            let productDescript = document.createElement("p");
            productDescript.setAttribute("class", "productDescription");
            productDescript.innerText = value[i].description;
            article.appendChild(productDescript);
        }
    })
    .catch(function (err) {
        console.log(err);
        // Une erreur est survenue
    });
