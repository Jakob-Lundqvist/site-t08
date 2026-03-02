const productContainer = document.querySelector(".product_list_container");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((product) => {
      let soldOutClass = product.soldout ? "udsolgt" : "";
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

      productContainer.innerHTML += `
        <article class="product_card ${soldOutClass}">
          <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="${product.productdisplayname}">
          <h3>${product.productdisplayname}</h3>
          ${priceHTML}
          ${soldOutLabel}
          <a href="product.html?id=${product.id}" class="button ${product.soldout ? "disabled" : ""}">
            Se produkt
          </a>
        </article>
      `;
    });
  });
