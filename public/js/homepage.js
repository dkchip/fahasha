import { dataCategory } from "./data/category.js";
import { dataTextbooks,dataForeignBooks } from "./data/books.js";
import {dataBackpacks} from "./data/backpacks.js"
import { dataToys } from "./data/toys.js";

const $$ = (el) => {
  return document.querySelector(el);
};

const $$$ = (el) => {
  return document.querySelectorAll(el);
};

const accountLocal = localStorage.getItem('accounts')
const logindLocal = localStorage.getItem('logind')
if(!accountLocal){
  let user = [
        {
            "id" : 1,
            "name" : "hoang viet",
            "cart" : [
            ]
        }
    ]
    localStorage.setItem("usersInfo", JSON.stringify(user))


    let account = [
        {
            "id" : 1,
            "email" : "admin@gmail.com",
            "password" : 123123
        }
    ]

    localStorage.setItem("accounts", JSON.stringify(account))
}

if(!logindLocal){
  let logind = {
    status : false,
    dataUser : {

    }
  }

  localStorage.setItem("logind", JSON.stringify(logind))

}

// Get element HTML
const categogyEl = $$(".category-product-list");
const textbookMenuListEl = $$$(".textbook-menu-item");
const backpackMenuListEl = $$$(".backpack-menu-item");
const toyMenuListEl = $$$(".toy-menu-item");
const foreignMenuListEl = $$$(".foreign-menu-item");
const forgeinProductEl = $$(".foreign-product-list");


// Render element
const renderProductItem = (datas) => {
  let htmlProduct = "";
  htmlProduct = datas.slice(0,6).map((el) => {
   
    const price = el.price.toLocaleString().replace(",", ".");
    const discountPrice = ((el.price / 100) * (100 - el.discount_precent))
      .toLocaleString()
      .replace(",", ".");
    return `
      <div class="div-product-item animation-show"  >
          <a href = "./detail.html?id=${el.id}">
              <img class="product-img" src=${el.image} alt="">
              <div class="product-info">
                  <span class="product-title">
                      ${el.title}
                  </span>
                  <div class="product-discount-price">
                      <span>${discountPrice}đ</span>
                      <div class="product-percent-discount">-${el.discount_precent}%</div>
                  </div>
                  <span class="product-original-price">
                      ${price}đ
                  </span>
              </div>
           </a>
      </div>`;
    
  })
  return htmlProduct;
}

const renderCategoryTabItem = (datas) => {
  let htmlProduct = "";
  for(var i = 0; i < datas.length; i += 2) {
    const divs = datas
      .slice(i, i + 2)
      .map((el) => {
        const price = el.price.toLocaleString().replace(",", ".");
        return `<div class="div-product-item  animation-show"  >
                  <a href = "./detail.html?id=${el.id}" class="df">
                      <img class="product-img" src=${el.image} alt=${el.title}>
                      <div class="product-info">
                          <span class="product-title">
                            ${el.title}
                          </span>
                          <div class="product-discount-price">
                              <span>${price}</span>
                          </div>
                      </div>
                  </a>
                </div>`
      })
      .join('')

      htmlProduct += `<div class="div-product-item-wrap">${divs}</div>`;
}
  return htmlProduct;
}


// Render category
let html = "";
html = dataCategory.map((el, index) => {
  return `
        <div class="category-product-item" key = ${index}>
            <a href = ${el.path} class="category-product-link">
                <img src=${el.image} alt="">
                <p class="category-title">${el.title}</p>
            </a>
        </div>
    `;
});
if(categogyEl){
  categogyEl.innerHTML = html.join("");

}

// Handle active menu textbook

textbookMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderTextbook(id)

    var current = $$(".textbook-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render textbook products
const renderTextbook = (id) => {
    const textbookProductList = $$(".textbook-product-list");
    let htmlProduct = "";
    let newDataTextbooks = [];
    switch(id){
      case "0" :
          newDataTextbooks = dataTextbooks;
      
          break;
      case "1" :
          newDataTextbooks = []
          newDataTextbooks = dataTextbooks.filter((el) => {
              if(el.school_level.toString() === id) {
                  console.log(el.school_level)
                  return el
              }
          });
          break;
      case "2" :
          newDataTextbooks = []
          newDataTextbooks = dataTextbooks.filter((el) => {
              if(el.school_level.toString() === id) {
                  console.log(el.school_level)
                  return el
              }
          });
          break;
      case "3" :
        newDataTextbooks = []
        newDataTextbooks = dataTextbooks.filter((el) => {
            if(el.school_level.toString() === id) {
                console.log(el.school_level)
                return el
            }
        });
        break;
    }

    htmlProduct = renderProductItem(newDataTextbooks)
    textbookProductList.innerHTML = htmlProduct.join("");
};

renderTextbook("0");


// Handle Active Menu Backpack
backpackMenuListEl.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("id");
      renderBackpack(id)
  
      var current = $$(".backpack-menu-item.active");
      current.classList.remove("active");
  
      el.classList.add("active");
    });
  });

// Render backpack products
const renderBackpack = (id) => {
    const backpackProductList = $$(".backpack-product-list");

    let htmlProduct = "";
    let newDataBackpacks = [];
    switch(id){
      case "0" :
          newDataBackpacks = dataBackpacks;
      
          break;
      case "1" :
          newDataBackpacks = []
          newDataBackpacks = dataBackpacks.filter((el) => {
              if(el.price < 700000) {

                  return el
              }
          });
          break;
    
    }

    htmlProduct = renderProductItem(newDataBackpacks.slice(0,5))
    backpackProductList.innerHTML = htmlProduct.join("");
};
renderBackpack("0");



// Handle Active Menu Toy
toyMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderToys(id)

    var current = $$(".toy-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render toy products
const renderToys = (id) => {
    const toyProductList = $$(".toy-product-list");
    let htmlProduct = "";
    let newDataToys = [];
    switch(id){
      case "0" :
          newDataToys = dataToys;
      
          break;
      case "1" :
          newDataToys = []
          newDataToys = dataToys.filter((el) => {
              if(el.lego) {
                  return el
              }
          });
          break;
    
    }

    htmlProduct = renderProductItem(newDataToys.slice(0,5))
    toyProductList.innerHTML = htmlProduct.join("");
    };

renderToys("0");



// Handle Active Menu Toy
foreignMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderForeign(id)

    var current = $$(".foreign-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render toy products
const renderForeign = (id) => {
    const toyProductList = $$(".toy-product-list");
    let htmlProduct = "";
    let newDataForeign = [];
    switch(id){
      case "foreign-0" :
        newDataForeign = dataForeignBooks.filter((el) => {
          if(el.title.includes("Jujutsu Kaisen")){
            return el;
          }
        });
      
          break;
      case "foreign-1" :
        newDataForeign = dataForeignBooks.filter((el) => {
          if(el.title.includes("Chainsaw")){
            return el;
          }
        });
          break;
    
    }

    htmlProduct = renderCategoryTabItem(newDataForeign)
    forgeinProductEl.innerHTML = htmlProduct;
    };

    renderForeign("foreign-0");