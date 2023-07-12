import dataProductAll from "./data/dataProductAll.js";

const $$ = (el) => {
    return document.querySelector(el);
  };
  
const status = JSON.parse(localStorage.getItem("logind")).status
// Get Element

const containerDetailEl = $$(".container-detail")

let count = 1;

// get  Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('id');
let dataProduct = {};

const renderHtmlProduct = (id) => {
    dataProductAll.forEach((el) => {
        if(el.id.toString() == id){
            dataProduct = el
        }
    })
    let html = `
        <div class="product-detail-wrap">
            <div class="product-detail">
                <div class="product-detail-img">
                    <img src=${dataProduct.image} alt="">
                </div>
                <div class="product-detail-preview">
                    <h3 class="product-detail-title">${dataProduct.title}</h3>
                    <div class="product-supplier">
                        <span>Nhà Cung Cấp :<b>${dataProduct.supplier}</b></span>
                        <span>Thương Hiệu : <b>${dataProduct.trademark}</b></span>
                    </div>
                    <div class="product-supplier">
                        <span>Xuất Xứ : <b>${dataProduct.origin}</b></span>
                    </div>
                    <div class="product-detail-price">
                        <span class="product-detail-original-price">${(dataProduct.price - dataProduct.price / 100 * dataProduct.discount_precent).toLocaleString().replace(",", ".")}đ
                        </span>
                        <span class="product-detail-discount-price">${dataProduct.price} đ</span>
                        <span class="percent">-${dataProduct.discount_precent}%</span>
                    </div>
                    <div class="delivery-time">
                        <span>Thời gian giao hàng</span>
                        <span>Giao hàng đến</span>
                    </div>
                    <div class="product-policy">
                        <span>Chính sách đổi trả</span>
                        <span>Đổi trả sản phẩm trong 30 ngày</span>
                    </div>
                    <div class="product-quantity">
                        <span>Số lượng :</span>
                        <div>
                        <i class="fa-solid fa-minus icon-minus"></i>
                        <span class="product-count">${count}</span>
                        <i class="fa-solid fa-plus icon-plus"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div class="product-btn">
                <button type="button" class="btn-cart">
                    <a href="">
                        <i class="fa-solid fa-cart-shopping" style="color: #c92127;"></i>
                        Thêm vào giỏ hàng
                    </a>
                </button>
                <button type="button" class="btn-buy">
                    <a href="">Mua ngay</a>
                </button>
            </div>
        </div>

        <div class = "endow width-content">
            <div class="endow-heading">
                 <i class="fa-solid fa-ticket" style="color: #c92127;"></i>
                 <h3>Ưu đãi liên quan</h3>
            </div>
            <div class="endow-content">
                <div class="voucher-list">
                    <div class="voucher-item">
                        <div class="voucher-icon">
                            <i class="fa-solid fa-credit-card" style="color: #fcfcfd;"></i>
                        </div>
                        <div class="voucher-info">
                            <h4>ZALOPAY: GIẢM 20k CHO ĐƠN HÀNG TỪ 400K</h4>
                            <span>
                                
                                Thanh toán bằng Zalopay, giảm ngay 20K cho đơn hàng từ 400K                                    
                            </span>
                        </div>
                    </div>
                    <div class="voucher-item">
                        <div class="voucher-icon">
                            <i class="fa-solid fa-credit-card" style="color: #fcfcfd;"></i>
                        </div>
                        <div class="voucher-info">
                            <h4>VNPAY: GIẢM 10% - TỐI ĐA 20K CHO ĐH TỪ 0Đ</h4>
                            <span>
                                Nhập mã "QRFHS20": Giảm 10% cho đơn hàng từ 150K - Nhập mã tại VNPAY                                           
                            </span>
                        </div>
                    </div>
                    <div class="voucher-item">
                        <div class="voucher-icon">
                            <i class="fa-solid fa-credit-card" style="color: #fcfcfd;"></i>
                        </div>
                        <div class="voucher-info">
                            <h4>POTICO.VN: HOA VÀ QUÀ GỬI NGƯỜI THƯƠNG - nhận ngay ưu đãi giảm 80K cho đh từ 299K khi mua sắm tại Potico.vn.</h4>
                            <span>
                                Khách hàng khi mua sắm tại Fahasa.com và app Fahasa với giá trị đơn hàng từ 100k trở lên nhận ngay E-Voucher giảm giá tại Potico.vn                                    
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container width-content" style="background-color: white;font-size: 14px;border-radius: 10px;">
            <p style="font-weight: bolder;font-size: 24px;padding: 6px;">Thông tin sản phẩm</p>
            <table class="table-info" style="padding: 8px 8px;">
                <tr>
                    <td>Mã hàng</td>
                    <td>${dataProduct.product_code}</td>
                </tr>
                <tr>
                    <td>Độ tuổi</td>
                    <td>${dataProduct.age}</td>
                </tr>
                <tr>
                    <td>Tên Nhà Cung Cấp</td>
                    <td>${dataProduct.supplier}</td>
                </tr>
                <tr>
                    <td>Tác giả</td>
                    <td>${dataProduct.author}</td>
                </tr>
                <tr>
                    <td>Ngôn ngữ</td>
                    <td>${dataProduct.language}</td>
                </tr>
                <tr>
                    <td>Trọng lượng (gr)</td>
                    <td>${dataProduct.weight}</td>
                </tr>
                <tr>
                    <td>Kích thước bao bì</td>
                    <td>${dataProduct.packaging_size} cm</td>
                </tr>
                <tr>
                    <td colspan="2">
                        Giá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...<br>
        Chính sách khuyến mãi trên Fahasa.com không áp dụng cho Hệ thống Nhà sách Fahasa trên toàn quốc
                    </td>
                </tr>
            </table>
            <hr><br>
            <div style="padding: 8px;" class="product-description">
                <p style="font-weight: bolder;">${dataProduct.title}</p>
                <span>
                   ${dataProduct.description}
                </span>
            </div>
        </div>
    `

    containerDetailEl.innerHTML = html
}

renderHtmlProduct(id);



const toastMessage = (message,duration = 1000) => {
    const mainEl = $$(".main")
    const newToast = document.createElement("div")  
    newToast.classList.add("toast")
    let htmlToast = `<span>${message}</span>`
    newToast.innerHTML = htmlToast
  
  
    mainEl.appendChild(newToast);
    let timerId  = setTimeout(() => {
      mainEl.removeChild(newToast);
    },duration)
  
    return () => {
      clearTimeout(timerId)
    }
  }

const iconMinusEl = $$(".icon-minus")
const iconPlusEl = $$(".icon-plus")
const btnAddCartEl = $$(".btn-cart")
iconMinusEl.addEventListener("click",() =>{
    if(count !== 1){
        const productCountEl = $$(".product-count");
        count --;
        productCountEl.innerHTML = count
   
    }

})

iconPlusEl.addEventListener("click",() =>{
    const productCountEl = $$(".product-count");
    count ++;
    productCountEl.innerHTML = count

})


btnAddCartEl.addEventListener('click',(e) => {
    if(!status){
        e.preventDefault()
        toastMessage("Đăng nhập để sử dụng chức năng này !",1000)
    }else{
        e.preventDefault()
        
        const logind = JSON.parse(localStorage.getItem("logind"))
        const usersInfo = JSON.parse(localStorage.getItem("usersInfo"))

        let indexUser = usersInfo.findIndex(user => user.id === logind.dataUser.id)
        let dataCart = {}
        let indexProduct = logind.dataUser.cart.findIndex((item) => {
            return item.product_id == dataProduct.id
            })


        if(indexProduct === -1){
            dataCart.product_id = dataProduct.id;
            dataCart.title = dataProduct.title;
            dataCart.price = dataProduct.price;
            dataCart.discount_precent = dataProduct.discount_precent;
            dataCart.count = count;
            dataCart.image = dataProduct.image
            
            logind.dataUser.cart.push(dataCart);
            usersInfo[indexUser].cart.push(dataCart);

            localStorage.setItem("logind",JSON.stringify(logind));
            localStorage.setItem("usersInfo",JSON.stringify(usersInfo));
            
        }else{
        
            logind.dataUser.cart[indexProduct].count += count;
            usersInfo[indexUser].cart = logind.dataUser.cart;

            localStorage.setItem("logind",JSON.stringify(logind));
            localStorage.setItem("usersInfo",JSON.stringify(usersInfo));

        }
        window.location.href = "./cart.html"
    }
})
