var tableau;
fetch("http://localhost:3000/api/products")
    .then(function (res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function (value) {
        console.log(value);
        tableau = value;
        for (let i = 0; i < value.length; i++) {
            let sectionItems = document.getElementById("items");
            let createProduct = document.createElement("a");
            createProduct.setAttribute(
                "href",
                `product.html?canapId=${value[i]._id}`
            );
            sectionItems.appendChild(createProduct);
            createProduct.innerHTML = `<article>
          <img src="${value[i].imageUrl}" alt="${value[i].altTxt}">
          <h3 class="productName">${value[i].name}</h3>
          <p class="productDescription">${value[i].description}</p>
          </article>`;
        }
    })
    .catch(function (err) {
        // Une erreur est survenue
    });
