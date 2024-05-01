const express = require('express');
const regisUser = require('./utils/auth/registration');
const cors = require('cors');


const app = express();

app.use(express.json());

// give access for the frontend to use API
app.use(cors({
    origin : 'http://localhost:5173'
}));

app.get('/', (req, res) => {
    res.send("Express is Running")
})

app.post('/api/regis', (req, res) =>{
    const {email, password , confirmPassword, username} = req.body

    if (!email || !password || !confirmPassword || !username){
        return res.status(400).json({
            error : "Missing information",
            message : "Please provide your email, username, and password to complete the registration."
        })
    }

    if(password !== confirmPassword){
        return res.status(400).json({
            error : "Passwords do not match",
            message : "The password and confirm password fields must match. Please ensure that both fields contain the same value."
        })
    }

    regisUser(username,email,password)
    .then(data => {res.status(200).json({
        massage : "Succesfully create user",
        user : data
    })})
    .catch(error => {
        let status = 400;
        if(error.error === "Email or username already exists"){
            status = 409;
        };
        
        res.status(status).json({error});
    })
})


app.listen(3000 , () => {
    console.log('http://localhost:3000/')
})
