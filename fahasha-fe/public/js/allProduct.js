
function filterPrice(elm,a,b){
    const ListEl = document.querySelectorAll(".row-option input");
    const url = new URL(window.location.href);
    url.searchParams.set('price',a + ',' + b);
    window.history.pushState({},"", url);

    if(elm.checked){
        ListEl.forEach((el) => {
            el.checked = false
        })
        elm.checked = true
    }else{
        url.searchParams.delete("price")
         window.history.pushState({},"", url);
    }
}



