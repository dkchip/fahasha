import { dataCategory } from "./data/category.js";
import dataProductAll from "./data/dataProductAll.js";


const $$ = (el) => {
    return document.querySelector(el);
  };
  
  const $$$ = (el) => {
    return document.querySelectorAll(el);
  };
  

// Get element
const navLinkEl = $$(".nav-links");
const menuHeaderEl = $$(".menu");

const menuCategoryHeadingEl = $$(".menu-category-heading");
const menuCategoryRowEl = $$(".menu-category-row");

const searchInputEl = $$(".search input");
const searchResults = $$(".search-result-wrapper");
const searchResultListEl = $$(".search-result-list");

const featuredCategoryEl = $$(".featured-category-list")  



// Render nav link
let htmlNavLink = "";

htmlNavLink = dataCategory.map((el,i) => {
    return `<a id-data = ${el.id} href=${el.path}> ${el.title}</a>`
})

navLinkEl.innerHTML = htmlNavLink.join("");


// Handle Render Data Menu Category When Hover
const handleRenderData = (el) =>{
  dataCategory.forEach((item) => {
    let html = "";
    let htmlHeading = "";
    if(item.id.toString() === el){
        htmlHeading = `
            ${item.icon}
            <h2 >
                ${item.title}
            </h2>
        `
        html = item.dataAll.map((data,i) => {
                let htmlChild = data.data.map((item,i) => {
                    return `<span key = ${i}> ${item.name}</span>`  
                })
                return `
                        <div key = ${i} class="menu-category-col">
                            <h5>${data.title}</h5>
                            ${htmlChild.join("")}
                            
                        </div>`
       })
       menuCategoryHeadingEl.innerHTML = htmlHeading;
       menuCategoryRowEl.innerHTML = html.join(" ")
    }
  })

}

const navLinkListEl = $$$(".nav-links>a");
navLinkListEl.forEach((el) => {
    el.addEventListener("mouseover",() => {
        
        const id = el.getAttribute("id-data");
        handleRenderData(id)
    } )
})

handleRenderData(dataCategory[0].id.toString())


// Show - Hide search results
searchInputEl.addEventListener("click", () => {
  searchResults.classList.add("show")
})

searchInputEl.addEventListener("focusout", () => {
  const timerId = setTimeout(() => {
    searchResults.classList.remove("show")
  },200)
  return () => {
    clearTimeout(timerId)
  }
})

menuHeaderEl.addEventListener('mouseover',() => {
  searchResults.classList.remove("show");

})

// Render featured category list link elment
const renderFeatureCategory =  () => {
  let html = '';
  html = dataCategory.map((el,index) => { 
    return (
      `
      <a key=${index} class="featured-category-item" href=${el.path}>
        <img src=${el.image} alt=${el.title}>
        <span>${el.title}</span>
      </a>
      `
    )
  })

  featuredCategoryEl.innerHTML = html.join('');
}

renderFeatureCategory();

// Render results item

const debounce = (fn, delay = 1000) => {
  let timerId = null;
  return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => fn(...args), delay);
  };
};

const renderSeachResults = (value) => {
  let results = []
  let htmlProduct = ''
  if(value == ''){
    searchResultListEl.innerHTML = '<span style="font-size: 1.2rem;">Không tìm thấy kết quả.</span>'
  }else{
    results = dataProductAll.filter((el) => {
      if(el.title.toLowerCase().includes(value.toLowerCase())) {
        return el
      }
    })
    if(results.length ==0){
       searchResultListEl.innerHTML = '<span style="font-size: 1.2rem;">Không tìm thấy kết quả.</span>'

    }else{
      htmlProduct = results.slice(0,6).map((product,index) => {
        return (
          ` <a key = ${index} class="search-result-item" href="./detail.html?id=${product.id}">
              <img src=${product.image}>
              <span>${product.title}</span>
            </a>
          `
        )
      })
      searchResultListEl.innerHTML = htmlProduct.join('')
    }
  }

  
}

const onInput = debounce(renderSeachResults, 500);

searchInputEl.addEventListener('input',(e) => {
    let value = e.target.value;
    if(value.startsWith(" ")){
      searchInputEl.value = "";
    }else{
      console.log(value)
      onInput(value.trim())
    }
})