const productContainer = document.querySelector(".product_container");

// 1️⃣ Hent id fra URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// 2️⃣ Fetch det specifikke produkt
fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
  .then((response) => response.json())
  .then((product) => {
    let soldOutLabel = product.soldout ? '<p class="sold_out_label">Udsolgt</p>' : "";

    let priceHTML = "";

    if (product.discount) {
      const newPrice = Math.round(product.price - (product.price * product.discount) / 100);

      priceHTML = `
        <p class="old_price">${product.price} kr</p>
        <p class="price discount">${newPrice} kr</p>
      `;
    } else {
      priceHTML = `<p class="price">${product.price} kr</p>`;
    }

    // 3️⃣ Indsæt produkt i HTML
    productContainer.innerHTML = `
      <div class="product_image">
        <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" 
             alt="${product.productdisplayname}">
      </div>

      <div class="product_info">
        <h2>${product.productdisplayname}</h2>
        <p>${product.category}</p>
        <p>${product.description}</p>
        ${priceHTML}
        ${soldOutLabel}
        <button class="button-product ${product.soldout ? "disabled" : ""}">
          Læg i kurv
        </button>
      </div>
    `;
  });
