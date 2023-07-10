import dataProductAll from "./data/dataProductAll.js";

const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};
  



// Get Element

const containerDetailEl = $$(".container-detail")

// get  Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');

const renderHtmlProduct = (id) => {
    let dataProduct = {};
    dataProductAll.forEach((el) => {
        if(el.id.toString() == id){
            console.log(el)
            dataProduct = el
        }
    })
    console.log(dataProduct.supplier)
    let html = `
        <div class="product-detail-wrap">
            <div class="product-detail">
                <div class="product-detail-img">
                    <img src=${dataProduct.image} alt="">
                </div>
                <div class="product-detail-preview">
                    <h3 class="product-detail-title">${dataProduct.title}</h3>
                    <div class="product-supplier">
                        <span>Nhà Cung Cấp :${dataProduct.supplier}</span>
                        <span>Thương Hiệu : ${dataProduct.trademark}</span>
                    </div>
                    <div class="product-supplier">
                        <span>Xuất Xứ : ${dataProduct.origin}</span>
                    </div>
                    <div class="product-detail-price">
                        <span class="product-detail-original-price">${(dataProduct.price - dataProduct.price / 100 * dataProduct.discount_precent).toLocaleString().replace(",", ".")}đ
                        </span>
                        <span class="product-detail-discount-price">${dataProduct.price}</span>
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
                            <i class="fa-solid fa-plus"></i>
                            <span class="product-count">4</span>
                            <i class="fa-solid fa-minus"></i>
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

