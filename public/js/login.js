const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
  return document.querySelectorAll(el);
};

let logind = JSON.parse(localStorage.getItem("logind"));

if(logind.status){
  window.location.href = "index.html"
}

  
// Get El
const btnSubmit = $$(".btnsubmit");
const inputEl = $$$(".form-row>input")


const handleLogin = (email,password) => {
  let dataUsers = JSON.parse(localStorage.getItem('accounts'));
  let usersInfo = JSON.parse(localStorage.getItem('usersInfo'));
  let blCheck = false;
  let idUser = null;
  let dataUserLocal = {}

  dataUsers.forEach((data) => {
    if(data.email === email && data.password === password) {
      blCheck = true;
      idUser = data.id;
    }
  });

  dataUserLocal =usersInfo.filter((el) => {
    if(el.id === idUser){
      return el
    }
  })

  if(blCheck) {
    logind.status = true;
    logind.dataUser = dataUserLocal[0]
 
    
    localStorage.setItem('logind', JSON.stringify(logind))

    alert("Đăng nhập thành công!")
    window.location.href = "index.html"
  }else{
    alert("Sai tk hoặc mật khẩu")
  }

}

btnSubmit.addEventListener("click",() => {
  const valueEmail = $$(".input-email").value;
  const valuePassword = $$(".input-password").value;
  handleLogin(valueEmail,valuePassword)
})

inputEl.forEach((el) => {
  el.addEventListener("keydown",(e) => {
    if(e.key === "Enter"){
      const valueEmail = $$(".input-email").value;
      const valuePassword = $$(".input-password").value;
      handleLogin(valueEmail,valuePassword)
    }
  })
})