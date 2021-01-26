// function layout
var logoutLayout = document.getElementById('task_lay')
var addLayout = document.getElementById('add_lay')
var profileLayout = document.getElementById('profile_lay')

// function show
var logoutDiv = document.getElementById('task_div')
var addDiv = document.getElementById('add_div')
var profileDiv = document.getElementById('profile_div')

// blur effect
const blur = document.getElementsByClassName('mainBlur')[0]
var myId = ""

function hideWelcome(){
    document.getElementById('main_body_welcome').style.display = 'none'
}
function scroolTop(){
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

logoutLayout.addEventListener('mouseover', function(){
    logoutLayout.style.marginTop = "94px"
    logoutDiv.style.display = 'block'
})
logoutLayout.addEventListener('mouseout', function(){
    logoutLayout.style.marginTop = "100px"
    logoutDiv.style.display = 'none'
})
addLayout.addEventListener('mouseover', function(){
    addLayout.style.marginTop = "94px"
    addDiv.style.display = 'block'
})
addLayout.addEventListener('mouseout', function(){
    addLayout.style.marginTop = "100px"
    addDiv.style.display = 'none'
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

// add data 
document.getElementById('add_p').addEventListener('click', function(){
    scroolTop()
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
// logout 
document.getElementById('task_p').addEventListener('click', function(){
    window.location.href = '/'
})
// put post data 
document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/getPostData', {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => putPostData(data['data']))
})
function putPostData(data){
    var task = document.getElementById('task_container')
    if(data.length === 0){
        task.innerHTML = '<p>No Result</p>'
        return
    }
    let newTask = ""
    data.forEach(function({post_title,post_desc,post_date,post_time,post_current,post_id}){
        newTask += `<div class="my-task">`
        newTask += `<div class="my-task-currentEdit">`
        newTask += `<div class="my-task-current">Post Date: ${post_current}</div>`
        newTask += `<div class="my-task-edit"><i data-id="${post_id}" class="fas fa-edit"></i><i data-id="${post_id}" class="fas fa-trash-alt"></i></div>`
        newTask += `</div>`
        newTask += `<div class="my-task-title">${post_title}</div>`
        newTask += `<div class="my-task-desc">${post_desc}</div>`
        newTask += `<div class="my-task-dateTime">`
        newTask += `<div class="my-task-date">Date: ${post_date}</div>`
        newTask += `<div class="my-task-time">Time: ${post_time}</div>`
        newTask += `</div>`
        newTask += `</div>`
    })
    task.innerHTML = newTask
}
// edit and delete post data
document.getElementById('task_container').addEventListener('click', function(event){
    editPost(event.target.dataset.id)
})
function editPost(id){
    myId = id
    fetch('http://localhost:3000/getPostIdData?id='+id, {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => insertDataEdit(data['data']))
}
var editLay = document.getElementById('edit_container')
var cancelEdit = document.getElementById('edit_cancel')
var addEdit = document.getElementById('edit_add')

var editTitle = document.getElementById('edit_title')
var editDesc = document.getElementById('edit_desc')
var editDate = document.getElementById('edit_date')
var editTime = document.getElementById('edit_time')
function insertDataEdit(data){
    scroolTop()
    editLay.style.display = 'flex'
    blur.style.display = 'block'
    editTitle.value = data[0].post_title
    editDesc.value = data[0].post_desc
    editDate.value = data[0].post_date
    editTime.value = data[0].post_time
}
cancelEdit.addEventListener('click', function(){
    editLay.style.display = 'none'
    blur.style.display = 'none'
})
addEdit.addEventListener('click', function(){
    var title = document.getElementById('edit_title').value
    var desc = document.getElementById('edit_desc').value
    var date = document.getElementById('edit_date').value
    var time = document.getElementById('edit_time').value

    fetch('http://localhost:3000/editPost?title='+title+'&desc='+desc+'&date='+date+'&time='+time+'&id='+myId, {
        method: "PATCH"
    })
    .then(res => res.json())
    .then(data => {
        if(data.success){
            location.reload()
        }
    })
})