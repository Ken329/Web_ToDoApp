// function layout
var taskLayout = document.getElementById('task_lay')
var addLayout = document.getElementById('add_lay')
var editLayout = document.getElementById('edit_lay')
var profileLayout = document.getElementById('profile_lay')

// function show
var taskDiv = document.getElementById('task_div')
var addDiv = document.getElementById('add_div')
var editDiv = document.getElementById('edit_div')
var profileDiv = document.getElementById('profile_div')

// blur effect
const blur = document.getElementsByClassName('mainBlur')[0]

function hideWelcome(){
    document.getElementById('main_body_welcome').style.display = 'none'
}

taskLayout.addEventListener('mouseover', function(){
    taskLayout.style.marginTop = "94px"
    taskDiv.style.display = 'block'
})
taskLayout.addEventListener('mouseout', function(){
    taskLayout.style.marginTop = "100px"
    taskDiv.style.display = 'none'
})
addLayout.addEventListener('mouseover', function(){
    addLayout.style.marginTop = "94px"
    addDiv.style.display = 'block'
})
addLayout.addEventListener('mouseout', function(){
    addLayout.style.marginTop = "100px"
    addDiv.style.display = 'none'
})
editLayout.addEventListener('mouseover', function(){
    editLayout.style.marginTop = "94px"
    editDiv.style.display = 'block'
})
editLayout.addEventListener('mouseout', function(){
    editLayout.style.marginTop = "100px"
    editDiv.style.display = 'none'
})
profileLayout.addEventListener('mouseover', function(){
    profileLayout.style.marginTop = "94px"
    profileDiv.style.display = 'block'
})
profileLayout.addEventListener('mouseout', function(){
    profileLayout.style.marginTop = "100px"
    profileDiv.style.display = 'none'
})

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getUserName')
    .then(res => res.json())
    .then(data => userName(data['data']))
})
function userName(name){
    document.getElementById('main_body_welcome').innerHTML = "Welcome back " + name
    setTimeout(hideWelcome, 5000)
}

var addContainer = document.getElementById('add_container')
var addCancel = document.getElementById('add_cancel')
var addAdd = document.getElementById('add_add')

function checkDate(date){
    var pattern =/^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
    if(!pattern.test(date)){
        return false
    }else{
        return true
    }
}

document.getElementById('add_p').addEventListener('click', function(){
    addContainer.style.display = 'flex'
    blur.style.display = 'block'
})  
addCancel.addEventListener('click', function(){
    addContainer.style.display = 'none'
    blur.style.display = 'none'
})
addAdd.addEventListener('click', function(){
    var title = document.getElementById('add_title').value
    var desc = document.getElementById('add_desc').value
    var date = document.getElementById('add_date').value
    var time = document.getElementById('add_time').value
    var today = new Date()
    var currDate = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()

    if(checkDate(date)){
        fetch('http://localhost:3000/addPost?title='+title+'&desc='+desc+'&date='+date+'&time='+time+'&currDate='+currDate, {
            method: "POST"
        })
        .then(res => res.json())
        .then(data => {
            if(data.success){
                location.reload()
            }
        })
    }else{
        alert("Invalid date pattern, please check")
    }
})

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getPostData', {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => putPostData(data['data']))
})
function putPostData(data){
    // var task = document.getElementById('task_container')
    // if(data.length === 0){
    //     task.innerHTML = '<p>No Result</p>'
    //     return
    // }
    // var newTask = ""
    // for(var i = 0; i < data.length; i++){
    //     newTask += `<div class="my-task"></div>`
    // }
    // task.innerHTML = newTask

}