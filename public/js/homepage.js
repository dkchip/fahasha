import { dataCategory } from "./data/category.js";
import { dataTextbooks,dataForeignBooks } from "./data/books.js";
import {dataBackpacks,dataSupplies} from "./data/backpacks.js"
import { dataToys } from "./data/toys.js";

const $$ = (el) => {
  return document.querySelector(el);
};

const $$$ = (el) => {
  return document.querySelectorAll(el);
};


// Lấy thẻ HTML
const categogyEl = $$(".category-product-list");
const textbookMenuListEl = $$$(".textbook-menu-item");
const backpackMenuListEl = $$$(".backpack-menu-item");
const toyMenuListEl = $$$(".toy-menu-item");

const foreignMenuListEl = $$$(".foreign-menu-item");
const forgeinProductEl = $$(".foreign-product-list");

const applianceMenuListEl = $$$(".appliance-menu-item");
const applianceProductEl = $$(".appliance-product-list");


// Render sản phẩm
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

// Render sản phẩm Combo
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


// Render danh mục sản phẩm homepage
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

// xử lí active sách trong nước

textbookMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderTextbook(id)

    var current = $$(".textbook-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render sản phẩm sách trong nước
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
                  return el
              }
          });
          break;
      case "2" :
          newDataTextbooks = []
          newDataTextbooks = dataTextbooks.filter((el) => {
              if(el.school_level.toString() === id) {
                  return el
              }
          });
          break;
      case "3" :
        newDataTextbooks = []
        newDataTextbooks = dataTextbooks.filter((el) => {
            if(el.school_level.toString() === id) {
                return el
            }
        });
        break;
    }

    htmlProduct = renderProductItem(newDataTextbooks)
    textbookProductList.innerHTML = htmlProduct.join("");
};

renderTextbook("0");


// Xử lí active menu balo
backpackMenuListEl.forEach((el) => {
    el.addEventListener("click", () => {
      const id = el.getAttribute("id");
      renderBackpack(id)
  
      var current = $$(".backpack-menu-item.active");
      current.classList.remove("active");
  
      el.classList.add("active");
    });
  });

// Render sản phẩm balo
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



// Xử lí active menu đồ chơi
toyMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderToys(id)

    var current = $$(".toy-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render sản phẩm đồ chơi
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


// Xử lí active menu foreign

foreignMenuListEl.forEach((el) => {
  el.addEventListener("click", () => {
    const id = el.getAttribute("id");
    renderForeign(id)

    var current = $$(".foreign-menu-item.active");
    current.classList.remove("active");

    el.classList.add("active");
  });
});

// Render sản phẩm Foreign
const renderForeign = (id) => {
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

    htmlProduct = renderCategoryTabItem(newDataForeign.slice(0,4))
    forgeinProductEl.innerHTML = htmlProduct;
    };

    renderForeign("foreign-0");


// Xử lí active menu foreign

applianceMenuListEl.forEach((el) => {
el.addEventListener("click", () => {
  const id = el.getAttribute("id");
  renderAppliance(id)

  var current = $$(".appliance-menu-item.active");
  current.classList.remove("active");

  el.classList.add("active");
});
});

// Render sản phẩm dụng cụ
const renderAppliance = (id) => {

  let htmlProduct = "";
  let newDataAppliance = [];
  switch(id){
    case "appliance-0" :
      newDataAppliance = dataSupplies
    
        break;
    case "appliance-1" :
      newDataAppliance = dataSupplies.filter((el) => {
        if(el.pen){
          return el;
        }
      });
        break;
  
  }

  htmlProduct = renderCategoryTabItem(newDataAppliance.slice(0,4))
  applianceProductEl.innerHTML = htmlProduct;
  };

  renderAppliance("appliance-0");