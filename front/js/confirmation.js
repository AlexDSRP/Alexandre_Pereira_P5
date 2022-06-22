let url = window.location.search;
let urlParams = new URLSearchParams(url);
let orderId = urlParams.get("id");
console.log(orderId);

let confirmation = document.querySelector("#orderId");
confirmation.innerText = orderId;
