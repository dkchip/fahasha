import dataProductAll from "./data/dataProductAll.js";
import { dataTextbooks } from "./data/books.js";
import { dataForeignBooks } from "./data/books.js";
import { dataBackpacks } from "./data/backpacks.js"; 
import { dataToys } from "./data/toys.js";

const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};


// Get Element 

const listProductEl = $$('.list-product');
const ListEl = document.querySelectorAll(".row-option input");


const url = new URL(window.location.href);
let type = url.searchParams.get("type")

const renderProduct = (param,type) => {
    let html = '';
    let tempData = dataProductAll;
    let newProduct = [];

    switch(type){
        case "domestic":
            tempData = dataTextbooks;
            break;
        case "all":
            tempData = dataProductAll;
            break;
        case "foreign":
            tempData = dataForeignBooks;
            break;
        case "toy":
            tempData = dataToys;
            break;
        case "dungcu":
            tempData = dataBackpacks;
            break;
        default :
            tempData = dataProductAll;

    }
    if(param){
        newProduct = tempData.filter((el) => {
            if(el.price >= Number.parseInt(param[0]) && el.price <= Number.parseInt(param[1])){
                return el;
            }
        })
    }else{
        newProduct = tempData;
    }
    html = newProduct.slice(0,24).map((el,index) => {
        return `
            <div class="product-item">
                <a href="../detail.html?id=${el.id}">
                    <img src=.${el.image} alt="">
                    <div class="product-info">
                        <span class="product-title">${el.title}</span>
                        <span class="product-price">${(el.price - el.price/100*el.discount_precent).toLocaleString().replace(",",".")} đ</span>
                        <span class="product-original-price">${el.price}đ</span>
                    </div>
                </a>
            </div>
        `
    }) 
    if(html.length > 0){
        listProductEl.innerHTML = html.join("");
    }else{
        listProductEl.innerHTML = `<div style = "background-color : #f0f0f0;padding : 10px 6px; position: absolute;width:600px;border:1px solid #fcd344">
            <span>Không có sản phẩm phù hợp với từ khóa tìm kiếm của bạn.</span>
        </div>`
    }
}

renderProduct(null,type);



ListEl.forEach((el) => {
    el.addEventListener("click",() => {
        const url = new URL(window.location.href);
        let param = url.searchParams.get("price")
        if(param){
            param = param.split(",")
        }else{
            param === null
        }
        renderProduct(param,type)
    })
})