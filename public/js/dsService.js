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
    // check if the username appear
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
    // check if it is a valid username
    async checkUser(user){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select user_password from user where user_name = '"+user+"';"
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
    async addPost(title, desc, date, time, currDate, user){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = 'INSERT INTO `post`(`post_name`, `post_title`, `post_desc`, `post_date`, `post_time`, `post_current`, `post_id`) VALUES (?,?,?,?,?,?,?)'
                connection.query(query, [user, title, desc, date, time, currDate, null],(err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async getAllPost(user){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from post where post_name = '"+user+"'"
                connection.query(query, (err, result)=>{
                    if (err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async getPostIdData(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "select * from post where post_id = '"+id+"'"
                connection.query(query, (err, result)=>{
                    if (err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async editPost(title, desc, date, time, id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = 'UPDATE `post` SET `post_title`=?,`post_desc`=?,`post_date`=?,`post_time`=? WHERE post_id = ?'
                connection.query(query, [title, desc, date, time, id], (err, result)=>{
                    if(err) throw err
                    resolve(result)
                })
            })
            return response
        }catch(error){
            console.log(error)
        }
    }
    async deletePost(id){
        try{
            const response = await new Promise((resolve, reject)=>{
                const query = "delete from post where post_id = '"+id+"'"
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
}
module.exports = dbService
