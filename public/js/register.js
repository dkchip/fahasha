
const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};


// Get Element 

const btnSubmitEl = $$(".btnsubmit")
const inputEmail = $$(".input-email")
const inputUsername = $$(".input-username")
const inputPassword = $$(".input-password")
const inputRePassword = $$(".input-repassword")

const spanEmail = $$(".span-email");
const spanUsername = $$(".span-username");
const spanPassword = $$(".span-password");
const spanRePassword = $$(".span-repassword");

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


inputUsername.addEventListener("input",(e) => {
    if(e.target.value.startsWith(" ")){
        e.target.value = "";
    }
})

inputEmail.addEventListener("input",(e) => {
    if(e.target.value.startsWith(" ")){
        e.target.value = "";
    }
})

inputPassword.addEventListener("input",(e) => {
    if(e.target.value.startsWith(" ")){
        e.target.value = "";
    }
})

inputRePassword.addEventListener("input",(e) => {
    if(e.target.value.startsWith(" ")){
        e.target.value = "";
    }
})

// handle register

const handleRegister = async (email,password,userName) => {
    let emailCheck = false;
    let dataUsers = JSON.parse(localStorage.getItem('accounts'));
    let dataUsersInfos = JSON.parse(localStorage.getItem("usersInfo"))
    dataUsers.forEach((el) => {
        if(el.email ===email) emailCheck = true
    });

    if(emailCheck){
        inputEmail.classList.add("bd-color");
        spanEmail.innerHTML = "Email đã tồn tại !";
    }else{
        let newId = dataUsers[dataUsers.length -1].id + 1;
        dataUsers.push({
            "id" : newId,
            "email" : email,
            "password" : password
        })

        dataUsersInfos.push(
            {
                "id" : newId,
                "name" : userName,
                "cart" : [
                ]
            }
        )

        localStorage.setItem('accounts',JSON.stringify(dataUsers))
        localStorage.setItem("usersInfo", JSON.stringify(dataUsersInfos))
        
        toastMessage("Đăng kí thành công !",1200)
        setTimeout(() => {
            window.location.href = "./login.html"
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


btnSubmitEl.addEventListener("click", () => {
    const valueEmail = inputEmail.value.trim();
    const valuePassword = inputPassword.value.trim();
    const valueRePassword = inputRePassword.value.trim();
    const valueUsername = inputUsername.value
    // Check email
    let emailCheck = ValidateEmail(valueEmail);
    if(emailCheck){
        // Check Username
        if(valueUsername === ""){
            inputUsername.classList.add("bd-color");
            spanUsername.innerHTML = "Không được để ô trống !"
        }else{
            // Check length Password
            if(valuePassword.length < 6){
                inputPassword.classList.add("bd-color");
                 spanPassword.innerHTML = "Mật khẩu ít nhất 6 kí tự !"
            }else{
                if(valuePassword !== valueRePassword){
                    inputRePassword.classList.add("bd-color");
                    spanRePassword.innerHTML = "Mật khẩu không trùng khớp !"
                }else{
                    console.log("oke")
                    handleRegister(valueEmail,valuePassword,valueUsername)
                }
            }
        }
    }else{
        inputEmail.classList.add("bd-color")
        spanEmail.innerHTML = "Tài khoản phải là Email !"
    }
})



inputEl.forEach((el) => {
    el.addEventListener("keydown",(e) => {
      if(e.key === "Enter"){
        const valueEmail = inputEmail.value.trim();
        const valuePassword = inputPassword.value.trim();
        const valueRePassword = inputRePassword.value.trim();
        const valueUsername = inputUsername.value
        // Check email
        let emailCheck = ValidateEmail(valueEmail);
        if(emailCheck){
            // Check Username
            if(valueUsername === ""){
                inputUsername.classList.add("bd-color");
                spanUsername.innerHTML = "Không được để ô trống !"
            }else{
                // Check length Password
                if(valuePassword.length < 6){
                    inputPassword.classList.add("bd-color");
                     spanPassword.innerHTML = "Mật khẩu ít nhất 6 kí tự !"
                }else{
                    if(valuePassword !== valueRePassword){
                        inputRePassword.classList.add("bd-color");
                        spanRePassword.innerHTML = "Mật khẩu không trùng khớp !"
                    }else{
                        console.log("oke")
                        handleRegister(valueEmail,valuePassword,valueUsername)
                    }
                }
            }
        }else{
            inputEmail.classList.add("bd-color")
            spanEmail.innerHTML = "Tài khoản phải là Email !"
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
      spanUsername.innerHTML = "";
      spanPassword.innerHTML = "";
      spanRePassword.innerHTML = "";
    })
  })

  inputEl.forEach((el) => {
    el.addEventListener("input", () => {
      inputEl.forEach((el) => {
        el.classList.remove("bd-color")
      })
      spanEmail.innerHTML = "";
      spanUsername.innerHTML = "";
      spanPassword.innerHTML = "";
      spanRePassword.innerHTML = "";
    })
  })
  
  
  