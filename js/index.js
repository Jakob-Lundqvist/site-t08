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
