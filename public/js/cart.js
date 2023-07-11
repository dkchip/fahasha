const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};


const cartContentEl = $$(".cart-ui-content");

let logind = JSON.parse(localStorage.getItem("logind"));
// let logind = JSON.parse(localStorage.getItem("logind"));



if(!logind.status || logind.dataUser.cart.length === 0) {
    cartContentEl.innerHTML = `
            <div class="cart-empty" >
            <div class="cart-empty-container" >
                <div class="icon-empty-cart">
                    <img src="./public/imgs/ico_emptycart.svg">
                </div>
                <p >Chưa có sản phẩm trong giỏ hàng của bạn.</p>
                <a  href="./index.html">
                    <button class="button-shoping" type="button" title="Mua sắm ngay" >Mua sắm ngay</button>
                </a>
            </div>
        </div>
    `;

}else{
    let priceTotalProduct = null;

    let htmlProduct = ``;
    let htmlContent = ``;
    let dataCarts = logind.dataUser.cart;
    htmlProduct = dataCarts.map((el) => {
        priceTotalProduct += ((el.price - (el.price/100 * el.discount_precent)) * el.count);
        console.log()
        return `
            <div class="item-product-cart" >
                <div class="img-product-cart" >
                    <a class="product-image" href="./detail.html">
                        <img src=${el.image} >
                    </a>
                </div>
                <div class="group-product-info" >
                    <div class="info-product-cart" >
                        <h2 class="product-name-full-text" >
                            <a href="./detail.html?id=${el.product_id}" >${el.title}</a>
                        </h2>
                    
                        <div class="price-original" >
                            <div class="cart-price" >
                                <div class="cart-fhsItem-price" >
                                    <div>
                                        <span class="price" >${(el.price - (el.price/100 * el.discount_precent)).toLocaleString().replace(",",".")} đ</span>
                                    </div>
                                    <div class="fhsItem-price-old" >
                                        <span  >${el.price.toLocaleString().replace(",",".")} đ</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="number-product-cart" >
                        <div class="product-view-quantity-box" >
                            <div class="product-view-quantity-box-block" >
                                <span class="product-count">${el.count}</span>
                            </div>
                        </div>
                        <div></div>
                        <div class="cart-price-total" >
                            <span class="cart-price">
                                <span class="price" >${((el.price - (el.price/100 * el.discount_precent)) * el.count).toLocaleString().replace(",",".")}đ</span>
                            </span>
                        </div>
                    </div>
                </div>
                <div id-product=${el.product_id} class="div-of-btn-remove-cart" >
                    <i class="fa-solid fa-trash-can"></i>
                </div>
            </div>
        `
    })

    htmlContent = `
    
        <div class="page-title">
        <div class="page-title-container" >
            <p >GIỎ HÀNG</p>
        </div>
            </div>
            <form action="" method="post" id="form-cart" >
                <div class="cart-ui-wrapper" >
                    <div class="cart-ui-content" >
                        
                    
                        <!-- Mua hàng -->
                        <div style="width: 100%;display: flex;justify-content: space-between;">
                            <div class="cart-have-products" >
                        
                                <div class="header-cart-item" >
                            
                                    <div class="select-all" style = "padding:0 6px" >
                                        <span>Tất cả sản phẩm</span>
                                    </div>
                                    <div>
                                        <span>Số lượng </span>
                                        <span>Thành tiền </span>
                                    </div>
                                </div>
                                <div class="product-cart-left" >
                                    ${htmlProduct.join("")}
                                </div>
                                
                            </div>
                            <div class="total-money-wrapper" >
                                <div class="into-money">
                                    <span>Thành tiền</span>
                                    <span>${priceTotalProduct.toLocaleString().replace(",",".")}đ</span>
                                </div>
                                <div class="total-money">
                                    <div>
                                        <span class="total-money-text">Tổng Số tiền (gồm VAT)</span>
                                        <span class="total-money-price">${priceTotalProduct.toLocaleString().replace(",",".")}đ</span>
                                    </div>
                                </div>
                                <div class="btn-pay">
                                    Thanh Toán
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        `
        cartContentEl.innerHTML = htmlContent
}

const removeCartEl = $$$(".div-of-btn-remove-cart");

const remove = (id) => {
    
    const logind = JSON.parse(localStorage.getItem("logind"))
    const usersInfo = JSON.parse(localStorage.getItem("usersInfo"))

    let indexUser = usersInfo.findIndex(user => user.id === logind.dataUser.id)

    let indexProduct = logind.dataUser.cart.findIndex((item) => {
        return item.product_id == id
        })
    
        logind.dataUser.cart.splice(indexProduct, 1);
        usersInfo[indexUser].cart = logind.dataUser.cart;

        localStorage.setItem("logind",JSON.stringify(logind));
        localStorage.setItem("usersInfo",JSON.stringify(usersInfo));
}


removeCartEl.forEach((el) => {
    el.addEventListener("click",(e) => {
        const idProduct = el.getAttribute("id-product");
        remove(Number.parseInt(idProduct))
        window.location.reload()
    })
})