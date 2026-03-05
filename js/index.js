const categoryContainer = document.querySelector(".category_list_container");

fetch("https://kea-alt-del.dk/t7/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((category) => {
      categoryContainer.innerHTML += `
        <a href="productlist.html?category=${category.category}" 
           class="category_card">
          ${category.category}
        </a>
      `;
    });
  });
const sliderTrack = document.querySelector("#sliderTrack");

fetch("https://kea-alt-del.dk/t7/api/products")
  .then((response) => response.json())
  .then((data) => {
    const products = data.slice(0, 50);

    products.forEach((product) => {
      sliderTrack.innerHTML += `
          <a href="product.html?id=${product.id}" class="slider-item">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                 alt="${product.productdisplayname}">
          </a>
        `;
    });

    // Dupliker for infinite scroll
    products.forEach((product) => {
      sliderTrack.innerHTML += `
          <a href="product.html?id=${product.id}" class="slider-item">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp"
                 alt="${product.productdisplayname}">
          </a>
        `;
    });
  });
