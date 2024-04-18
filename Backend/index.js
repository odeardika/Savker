const express = require('express')
const regisUser = require('./utils/auth/registration')

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.send("Express is Running")
})
app.post('/api/regis', (req, res) =>{
    const {name, email, password , confirm_password} = req.body

    if (!name || !email || !password || !confirm_password){
        return res.status(400).json({
            error : "Missing information",
            message : "Please provide your email, username, and password to complete the registration."
        })
    }

    if(password === confirm_password){
        return res.status(400).json({
            error : "Passwords do not match",
            message : "The password and confirm password fields must match. Please ensure that both fields contain the same value."
        })
    }

    regisUser(name,email,password)
    .then(data => {res.status(200).json({massage : "Succesfully create user"})})
    .catch(error => {
        let status = 400
        if(error.error === "Email or username already exists"){
            status = 409
        }
        
        res.status(status).json({
            error : error
        })
    })
})


app.listen(3000 , () => {
    console.log('http://localhost:3000/')
})
