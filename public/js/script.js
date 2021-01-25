// button
const login = document.getElementById('login_btn')
const signUp = document.getElementById('signUp_btn')
const loginCancel = document.getElementById('login_cancel')
const signUpCancel = document.getElementById('signUp_cancel')
const btnSignUp = document.getElementById('signUp_log')
const btnLogin = document.getElementById('login_log')

//indexs
const loginPop = document.getElementById('login_pop')
const signupPop = document.getElementById('signUp_pop')
var blur = document.getElementsByClassName('blur')[0]

// error messages
const errorUser = document.getElementById('error_signup_user')
const errorPass = document.getElementById('error_signup_pass')
const errorBirth = document.getElementById('error_signup_birth')
const userError = document.getElementById('error_login_user')
const passError = document.getElementById('error_login_pass')

var user

// fade out function
function hideDiv(){
    errorUser.style.display = 'none'
    errorPass.style.display = 'none'
    errorBirth.style.display = 'none'
    userError.style.display = 'none'
    passError.style.display = 'none'
}
// reset height function
function resetHeight(){
    signupPop.style.height = "450px"
    loginPop.style.height = "300px"
}
// check birth
function checkBirth(birth){
    var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if(!pattern.test(birth)){
        return false
    }else{
        return true
    }
}

// login function
login.addEventListener('click', function(){
    loginPop.style.display = 'block'
    blur.style.display = 'block'
})
loginCancel.addEventListener('click', function(){
    loginPop.style.display = 'none'
    blur.style.display = 'none'
})
btnLogin.addEventListener('click', function(){
    var height = loginPop.clientHeight
    var check = true
    var username = document.getElementById('login_username').value
    var password = document.getElementById('login_password').value
    fetch('http://localhost:3000/login?user='+username+'&pass='+password, {
        method: 'POST'
    })
    .then(res => res.json())
    .then(data => {
        if(!data.user){
            height += 45
            check = false
            loginPop.style.height = height+"px"
            userError.style.display = 'flex'
        }else{
            if(password === data.user[0].user_password){
                window.location.href = '/main?user='+username
            }else{
                height += 45
                check = false
                loginPop.style.height = height+"px"
                passError.style.display = 'flex'
            }
        }
        if(!check){
            setTimeout("hideDiv()", 5000)
            setTimeout("resetHeight()", 5000)
        }
    })
})
// sign up function
signUp.addEventListener('click', function(){
    signupPop.style.display = 'block'
    blur.style.display = 'block'
})
signUpCancel.addEventListener('click', function(){
    signupPop.style.display = 'none'
    blur.style.display = 'none'
})
btnSignUp.addEventListener('click', function(){
    var check = true
    var height = signupPop.clientHeight
    var user = document.getElementById('signUp_username').value
    var pass = document.getElementById('signUp_password').value
    var phone = document.getElementById('signUp_phone').value
    var birth = document.getElementById('signUp_birth').value
    if(user.length < 6){
        width += 45
        signupPop.style.height = height+"px"
        errorUser.style.display = 'flex'
        check = false
    }
    if(pass.length < 6){
        width += 45
        signupPop.style.height = height+"px"
        errorPass.style.display = 'flex'
        check = false
    }
    if(!checkBirth(birth)){
        width += 45
        signupPop.style.height = height+"px"
        errorBirth.style.display = 'flex'
        check = false
    }
    if(check){
        fetch('http://localhost:3000/signUp?user='+user+'&pass='+pass+'&phone='+phone+'&birth='+birth,{
            method: 'POST'
        })
        .then(res => res.json())
        .then(data => {
            if(!data.success){
                alert("Username appear, please check !!!")
            }else{
                location.reload()
                alert("New User added")
            }
        })
    }else{
        setTimeout("hideDiv()", 5000)
        setTimeout("resetHeight()", 5000)
    }
})


