const mysql = require('mysql')
const {response} = require('express')
let instance = null

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todoapp'
})
connection.connect((err)=>{
    if(err){
        console.log(err.message)
    }else{
        console.log('db ' + connection.state)
    }
})
class dbService{
    static getDbServiceInstance(){
        return instance ? instance : new dbService()
    }
    async checkUsername(user){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from user where user_name = '"+user+"';"
                connection.query(query, (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async insertUser(user, pass, phone, birth){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "INSERT INTO `user`(`user_name`, `user_password`, `user_phone`, `user_birth`) VALUES (?,?,?,?);"
                connection.query(query, [user, pass, phone, birth], (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
}
module.exports = dbService
