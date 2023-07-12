const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
  return document.querySelectorAll(el);
};

let logind = JSON.parse(localStorage.getItem("logind"));

if(logind){
  if(logind.status){
    window.location.href = "./index.html"
  }
}

  
// Get El
const btnSubmit = $$(".btnsubmit");
const inputEmail = $$(".input-email")
const inputPassword = $$(".input-password")

const spanEmail = $$(".span-email");
const spanPassword = $$(".span-password");
const inputEl = $$$(".form-row>input")


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



const handleLogin = (email,password) => {
  let dataUsers = JSON.parse(localStorage.getItem('accounts'));
  let usersInfo = JSON.parse(localStorage.getItem('usersInfo'));
  let blEmailCheck = false;
  let blPasswordCheck = false;
  let idUser = null;
  let dataUserLocal = {}

  let position = dataUsers.findIndex((data,index) => {
    if(data.email === email ) {
      blEmailCheck = true;
      idUser = data.id;
      return index ;
    }
  });



  if(blEmailCheck){
    if(dataUsers[position].password === password){
      blPasswordCheck = true;
    }else{
      inputPassword.classList.add("bd-color");
      spanPassword.innerHTML = "Mật khẩu không chính xác !"; //
    }
  }else{
    inputEmail.classList.add("bd-color")
    spanEmail.innerHTML = "Tài khoản không chính xác !";
  }

  
  dataUserLocal = usersInfo.filter((el) => {
    if(el.id === idUser){
      return el
    }
  })

  if(blEmailCheck && blPasswordCheck) {
    logind.status = true;
    logind.dataUser = dataUserLocal[0]
 
    
    localStorage.setItem('logind', JSON.stringify(logind))

    toastMessage("Đăng nhập thành công ",1200)
    setTimeout(() => {
      window.location.href = "./index.html"
    },1200)
  }
}

function ValidateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
    return (false)
}

btnSubmit.addEventListener("click",() => {
  const valueEmail = $$(".input-email").value;
  const valuePassword = $$(".input-password").value;
  let blCheckEmail ;

  blCheckEmail = ValidateEmail(valueEmail)
  if(blCheckEmail){
    handleLogin(valueEmail,valuePassword)
  }else{
    inputEmail.classList.add("bd-color")
    spanEmail.innerHTML = "Tài khoản phải là email !"
  }
})

inputEl.forEach((el) => {
  el.addEventListener("keydown",(e) => {
    let blCheckEmail ;
    if(e.key === "Enter"){
      const valueEmail = $$(".input-email").value;
      const valuePassword = $$(".input-password").value;
      blCheckEmail = ValidateEmail(valueEmail)
      if(blCheckEmail){
        handleLogin(valueEmail,valuePassword)
      }else{
        inputEmail.classList.add("bd-color")
        spanEmail.innerHTML = "Tài khoản phải là email !"
      }
    }
  })
})

inputEl.forEach((el) => {
  el.addEventListener("click", () => {
    inputEl.forEach((el) => {
      el.classList.remove("bd-color")
    })
    spanEmail.innerHTML = "";
    spanPassword.innerHTML = "";
  })
})

inputEl.forEach((el) => {
  el.addEventListener("input", () => {
    inputEl.forEach((el) => {
      el.classList.remove("bd-color")
    })
    spanEmail.innerHTML = "";
    spanPassword.innerHTML = "";
  })
})



