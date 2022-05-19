let url= window.location.search
let urlParams = new URLSearchParams(url);
let elementId= urlParams.get("canapId")
console.log(elementId)

fetch(`http://localhost:3000/api/products/${elementId}`).then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
      console.log(value)
      let item_img= document.querySelector(".item__img")
      let img= document.createElement("img")
      item_img.appendChild(img)
      img.setAttribute(`src`,value.imageUrl)

      let item__content__titlePrice= document.querySelector("#title")
      item__content__titlePrice.innerText= value.name
      let price= document.querySelector("#price")
      price.innerText= value.price

      let description= document.querySelector("#description")
      description.innerText= value.description

      for(let i=0; i <value.colors.length; i++) {
          let colors= document.querySelector("#colors")
          let colorselect= document.createElement("option")
          colors.appendChild(colorselect)
          colorselect.setAttribute("value", value.colors[i])
          colorselect.innerText= value.colors[i]
      }
    
      colorselect.value

          }

  )
  .catch(function(err) {
    // Une erreur est survenue
  });