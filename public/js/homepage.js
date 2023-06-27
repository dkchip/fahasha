import { dataCategory } from "./data/category.js";
import { dataTextbooks } from "./data/books.js";

const $$ = (el) => {
  return document.querySelector(el);
};

const $$$ = (el) => {
  return document.querySelectorAll(el);
};

// Get element HTML
const categogyEl = $$(".category-product-list");
const textbookMenuListEl = $$$(".textbook-menu-item");
const textbookProduct = $$(".textbook-product-list");

// Render category
let html = "";
html = dataCategory.map((el, index) => {
  return `
        <div class="category-product-item" key = ${index}>
            <a href=${el.path} class="category-product-link">
                <img src=${el.image} alt="">
                <p class="category-title">${el.title}</p>
            </a>
        </div>
    `;
});

categogyEl.innerHTML = html.join("");

// Handle active menu textbook

textbookMenuListEl.forEach((el) => {
    el.addEventListener("click", () => {
        var current = $$(".textbook-menu-item.active");
        current.classList.remove("active");

        el.classList.add("active");
    });
});

// Remder textbook products
let htmlProduct = "";
htmlProduct = dataTextbooks.map((el, index) => {
    const price = el.price.toLocaleString().replace(",",".");
    const discountPrice = ((el.price / 100) * (100 - el.discount_precent)).toLocaleString().replace(",",".");
  return `
    <div class="textbook-product-item">
        <img class="textbook-img" src=${el.image} alt="">
        <div class="textbook-info">
            <span class="textbook-title">
                ${el.title}
            </span>
            <div class="textbook-discount-price">
                <span>${discountPrice}đ</span>
                <div class="percent-discount">-${el.discount_precent}%</div>
            </div>
            <span class="original-price">
                ${price}đ
            </span>
        </div>
    </div>`
});

textbookProduct.innerHTML = htmlProduct.join("")