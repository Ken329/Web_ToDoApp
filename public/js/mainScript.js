// function layout
const taskLayout = document.getElementById('task_lay')
const editLayout = document.getElementById('edit_lay')
const profileLayout = document.getElementById('profile_lay')

// function show
const taskDiv = document.getElementById('task_div')
const editDiv = document.getElementById('edit_div')
const profileDiv = document.getElementById('profile_div')

function hideWelcome(){
    document.getElementById('main_body_welcome').style.display = 'none'
}

taskLayout.addEventListener('mouseover', function(){
    taskLayout.style.marginTop = "89px"
    taskDiv.style.display = 'block'
})
taskLayout.addEventListener('mouseout', function(){
    taskLayout.style.marginTop = "100px"
    taskDiv.style.display = 'none'
})
editLayout.addEventListener('mouseover', function(){
    editLayout.style.marginTop = "89px"
    editDiv.style.display = 'block'
})
editLayout.addEventListener('mouseout', function(){
    editLayout.style.marginTop = "100px"
    editDiv.style.display = 'none'
})
profileLayout.addEventListener('mouseover', function(){
    profileLayout.style.marginTop = "89px"
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