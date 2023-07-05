import { dataCategory } from "./data/category.js";

const $$ = (el) => {
    return document.querySelector(el);
  };
  
  const $$$ = (el) => {
    return document.querySelectorAll(el);
  };
  

// Get element
const navLinkEl = $$(".nav-links");

const menuCategoryHeadingEl = $$(".menu-category-heading")
const menuCategoryRowEl = $$(".menu-category-row")




// Render nav link
let htmlNavLink = "";

htmlNavLink = dataCategory.map((el,i) => {
    return `<a id-data = ${el.id} href=${el.path}> ${el.title}</a>`
})

navLinkEl.innerHTML = htmlNavLink.join("");


// Handle Render Data Menu Category When Hover
function handleRenderData (el){
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


