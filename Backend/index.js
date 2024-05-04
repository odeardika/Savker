const express = require('express');
const {regisUser} = require('./utils/auth/registration');
const {loginUser} = require('./utils/auth/login');
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
        message : "Succesfully create user",
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

app.post('/api/login', (req,res) => {
    const {identifier, password} = req.body;

    if(!identifier || !password){
        return res.status(400).json({
            error : "Missing information",
            message : "Please provide your email, username, and password to complete the registration."
        });    
    };

    loginUser(identifier, password)
    .then(data => {
        return res.status(200).json({
            data
        })
    })
    .catch(error => {
        if("Unauthorized" === error.error){
            return res.status(400).json({
                success : false,
                error : "Unauthorized",
                message : "Incorrect password. Please double-check your password and try again."
            })    
        }
        if("Not Found" === error.error){
            const errorMessage = (error.message === "Incorrect password. Please double-check your password and try again.")? "email" : "username"; 
            return res.status(404).json({
                error : "Not Found",
                message : `User not found. Please double-check your ${errorMessage} and try again or register for a new account.`
            })
        }
        return res.status(401).json({
            error : error
        })
    })
})

app.listen(3000 , () => {
    console.log('http://localhost:3000/')
})
