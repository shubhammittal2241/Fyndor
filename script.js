
const container = document.getElementsByClassName("products")[0];


async function fetchproducts(api) {
  const res = await fetch(api);
  const data = await res.json();
  return data;
}
let tot=[]
async function loadproducts() {
  try {
    const products1 = await fetchproducts("https://fakestoreapiserver.reactbd.org/api/products?page=1&perPage=50");
    const products2 = await fetchproducts("https://fakestoreapiserver.reactbd.org/api/walmartproducts?page=1&perPage=50");

    console.log(products1);
    console.log(products2);
    
    tot = [...products1.data, ...products2.data];

    displayproducts(tot);

  } catch (er) {
    console.log(er);
   container.innerHTML = "Failed to load data";
  }
}

loadproducts();
  





function displayproducts(products) {
container.innerHTML = "";

  products.forEach((product) => {



    container.innerHTML += `
         <div class="item">
          <div class="photo">
            <img src="${product.image}">
          </div>
          <div class="product-text">
            <p>${product.brand}</p>
            <h3>${product.title}</h3>
            <span>₹${(product.price*80).toFixed(2)}</span>
          </div>
        </div>`;
        
  });
}


function categoryfilter(products) {
  let selected = [];

  document.querySelectorAll(".category").forEach(i => {
    if (i.checked)
    selected.push(i.value);
  });

  if (selected.length === 0) 
    {return products;}

  return products.filter(p =>
    selected.includes(p.category)
  
  );
}


function pricefilter(products) {
  let maxi = document.querySelector(".range").value;

  return products.filter(p => {return p.price * 80 <= maxi});
}


function sortproducts(products) {
  let sortValue = document.getElementById("sorting").value;

  if (sortValue === "low") {
    return products.sort((a, b) => a.price - b.price);
  } 
  else if (sortValue === "high") {
    return products.sort((a, b) => b.price -a.price);
  }

  return products;
}


function searchfilter(products) {
  let search = document.getElementsByClassName("search")[0].value.toLowerCase();

  if (!search) return products;

  return products.filter(p =>
    p.title.toLowerCase().includes(search) || p.brand.toLowerCase().includes(search)
  );
}



function updateProducts() {
  let filtered = [...tot];

  filtered = searchfilter(filtered);
  filtered = categoryfilter(filtered);
  filtered = pricefilter(filtered);
  filtered = sortproducts(filtered);


  displayproducts(filtered);
}



document.querySelectorAll(".category").forEach(i => {
  i.addEventListener("change", updateProducts);
});

let range = document.querySelector(".range");
let price = document.getElementById("rupee");

range.addEventListener("input", () => {
  price.textContent = "₹" + range.value;
  updateProducts();
});

document.getElementById("sorting").addEventListener("change", updateProducts);
document.getElementsByClassName("search")[0].addEventListener("input", updateProducts);