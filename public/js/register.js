const $$ = (el) => {
    return document.querySelector(el);
  };
  
const $$$ = (el) => {
return document.querySelectorAll(el);
};


// Get Element 

const btnSubmitEl = $$(".btnsubmit")

// handle register

const handleRegister = async (email,password,rePassword,userName) => {
    let emailCheck = false;
    let dataUsers = JSON.parse(localStorage.getItem('arrUser'));
    let dataUsersInfos = JSON.parse(localStorage.getItem("usersInfo"))
    dataUsers.forEach((el) => {
        if(el.email ===email) emailCheck = true
    });

    if(emailCheck){
        alert("Email đã tồn tại");
        return 0
    }else{
        if(password === rePassword){
            localStorage.removeItem("arrUser")
            localStorage.removeItem("usersInfo")
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

                console.log(dataUsersInfos)
            localStorage.setItem('arrUser',JSON.stringify(dataUsers))
            localStorage.setItem("usersInfo", JSON.stringify(dataUsersInfos))

            alert("Đăng kí thành công");
            
            
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


// let user = [
//     {
//         "id" : 1,
//         "name" : "hoang viet",
//         "cart" : [
//         ]
//     }
// ]
// localStorage.setItem("usersInfo", JSON.stringify(user))
// localStorage.removeItem("userInfos")


// let account = [
//     {
//         "id" : 1,
//         "email" : "admin@gmail.com",
//         "password" : 123123
//     }
// ]

// localStorage.setItem("arrUser", JSON.stringify(account))
// localStorage.removeItem("userInfos")