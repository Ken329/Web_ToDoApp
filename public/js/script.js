var login = document.getElementById('login_btn')
var signUp = document.getElementById('signUp_btn')
var loginCancel = document.getElementById('login_cancel')
var signUpCancel = document.getElementById('signUp_cancel')
var btnSignUp = document.getElementById('signUp_log')
var btnLogin = document.getElementById('login_log')

//indexs
var loginPop = document.getElementById('login_pop')
var signupPop = document.getElementById('signUp_pop')
var blur = document.getElementsByClassName('blur')[0]

var errorUser = document.getElementById('error_signup_user')
var errorPass = document.getElementById('error_signup_pass')
var errorBirth = document.getElementById('error_signup_birth')

// fade out function
function hideDiv(){
    errorUser.style.display = 'none'
    errorPass.style.display = 'none'
    errorBirth.style.display = 'none'
}
// reset height function
function resetHeight(){
    signupPop.style.height = "450px"
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

login.addEventListener('click', function(){
    loginPop.style.display = 'block'
    blur.style.display = 'block'
})
loginCancel.addEventListener('click', function(){
    loginPop.style.display = 'none'
    blur.style.display = 'none'
})
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
    var width = signupPop.clientWidth
    var user = document.getElementById('signUp_username').value
    var pass = document.getElementById('signUp_password').value
    var phone = document.getElementById('signUp_phone').value
    var birth = document.getElementById('signUp_birth').value
    if(user.length < 6){
        width += 35
        signupPop.style.height = width+"px"
        errorUser.style.display = 'flex'
        check = false
    }
    if(pass.length < 6){
        width += 35
        signupPop.style.height = width+"px"
        errorPass.style.display = 'flex'
        check = false
    }
    if(!checkBirth(birth)){
        width += 35
        signupPop.style.height = width+"px"
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

