const container = document.getElementById("products");

container.innerHTML = "Loading products...";

fetch("https://dummyjson.com/products")
  .then(res => res.json())
  .then(data => {
    displayProducts(data.products);
  })
  .catch(() => {
    container.innerHTML = "Failed to load data";
  });

function displayProducts(products) {
  container.innerHTML = "";

  products.map(product => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${product.thumbnail}" />
      <h3>${product.title}</h3>
      <div class="price">$${product.price}</div>
    `;

    container.appendChild(card);
  });
}