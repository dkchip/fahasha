const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};


// Get Element 

const btnSubmitEl = $$(".btnsubmit")
const inputEl = $$$(".form-row>input")


// handle register

const handleRegister = async (email,password,rePassword,userName) => {
    let emailCheck = false;
    let dataUsers = JSON.parse(localStorage.getItem('accounts'));
    let dataUsersInfos = JSON.parse(localStorage.getItem("usersInfo"))
    dataUsers.forEach((el) => {
        if(el.email ===email) emailCheck = true
    });

    if(emailCheck){
        alert("Email đã tồn tại");
        return 0
    }else{
        if(password === rePassword){
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
            alert("Đăng kí thành công");
            window.location = "/login.html"
            
            
        }else{
            alert("Mật khẩu không trùng khớp");
        }
    }
}

btnSubmitEl.addEventListener("click", () => {
    const valueEmail = $$(".input-email").value
    const valuePassword = $$(".input-password").value
    const valueRePassword = $$(".input-re-password").value
    const valueUsername = $$(".input-username").value

    if(valueEmail.trim() == "" || valuePassword.trim() == "" || valueRePassword.trim() == "" || valueUsername.trim() == "" ){
        alert("Không được để trống")
    }else{
        handleRegister(valueEmail,valuePassword,valueRePassword,valueUsername)
    }

})


inputEl.forEach((el) => {
    el.addEventListener("keydown",(e) => {
      if(e.key === "Enter"){
        const valueEmail = $$(".input-email").value
        const valuePassword = $$(".input-password").value
        const valueRePassword = $$(".input-re-password").value
        const valueUsername = $$(".input-username").value

        if(valueEmail.trim() == "" || valuePassword.trim() == "" || valueRePassword.trim() == "" || valueUsername.trim() == "" ){
            alert("Không được để trống")
        }else{
            handleRegister(valueEmail,valuePassword,valueRePassword,valueUsername)
        }
        }
    })
  })