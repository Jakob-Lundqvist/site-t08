const productContainer = document.querySelector(".product_list_container");
const productOverskrift = document.querySelector(".overskrift");
// HENT KATEGORI FRA URL
const params = new URLSearchParams(window.location.search);
const selectedCategory = params.get("category");

// BYG URL (med eller uden kategori)
const url = selectedCategory ? `https://kea-alt-del.dk/t7/api/products?category=${selectedCategory}` : "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    // RYD CONTAINER
    productContainer.innerHTML = "";

    if (data.length === 0) {
      productContainer.innerHTML = "<p>Ingen produkter fundet.</p>";
      return;
    }

    data.forEach((product) => {
      // UDSOLGT
      let soldOutClass = product.soldout ? "udsolgt" : "";
      let soldOutLabel = product.soldout ? `<p class="sold_out_label">Udsolgt</p>` : "";

      // RABAT
      let discountHTML = "";

      if (product.discount) {
        const newPrice = Math.round(product.price - (product.price * product.discount) / 100);

        discountHTML = `
          <p class="old_price">${product.price} kr</p>
          <p class="price discount">${newPrice} kr</p>
        `;
      } else {
        discountHTML = `<p class="price">${product.price} kr</p>`;
      }
      productOverskrift.innerHTML = `
      <h2> ${product.category}</h2>`;
      // INDSÆT PRODUKT
      productContainer.innerHTML += `
  <article class="product_card ${soldOutClass}">
    <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
         alt="${product.productdisplayname}">
    <h3>${product.productdisplayname}</h3>
    ${discountHTML}
    ${soldOutLabel}
    <a href="product.html?id=${product.id}" 
       class="button ${product.soldout ? "disabled" : ""}">
      Se produkt
    </a>
  </article>
`;
    });
  })
  .catch((error) => {
    productContainer.innerHTML = "<p>Der skete en fejl ved hentning af produkter.</p>";
    console.error("Fejl:", error);
  });
