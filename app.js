const express = require('express')
const parser = require('body-parser')
const app = express()
const port = 3000
const dbService = require('./public/js/dsService')
const {check, validationResult} = require('express-validator')

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))

app.set('views', './views')
app.set('view engine' , 'ejs')

const urlEncoded = parser.urlencoded({ extended : false})

app.get('', (req, res)=>{
    res.render('index')
})
app.get('/main', (req, res)=>{
    res.render('mainActivity')
})
app.post('/signUp', urlEncoded, (req, res)=>{
    const user = req.query.user
    const pass = req.query.pass
    const phone = req.query.phone
    const birth = req.query.birth

    const db = dbService.getDbServiceInstance()

    const checkResult = db.checkUsername(user)
    checkResult
    .then(data => {
        if(data.length === 0){
            const result = db.insertUser(user, pass, phone, birth)
            result
            .then(data => res.json({success : true}))
            .catch(err => console.log(err))
        }else{
            res.json({success : false})
        }
    })
    .then(err => console.log(err))
})
app.post('/login', urlEncoded, (req, res)=>{
    const user = req.query.user
    const pass = req.query.pass
    
    const db = dbService.getDbServiceInstance()

    const checkUser = db.checkUser(user)
    checkUser
    .then(data => {
        if(data.length === 0){
            res.json({user : false})
        }else{
            res.json({user : data})
        }
    })
    .then(err => console.log(err))
})

app.listen(port, () => console.info(`Listening on port ${port}`))