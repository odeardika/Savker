const emailValidator = require("email-validator").validate;
const {getUser} = require('../database/prismaUtils');


async function loginUser(identifier, password){
    return new Promise((resolve, reject) => {
        if(emailValidator(identifier)){
            user = getUser(identifier, "email").then(data => {
                if(!data){
                    return reject({
                        success : false,
                        error : "Not Found",
                        message : "User not found. Please double-check your email and try again or register for a new account."
                    })
                }
                if(data.password !== password){
                    return reject({ 
                        success : false,
                        error: "Unauthorized",
                        message: "Incorrect password. Please double-check your password and try again."
                    });
                };
                return resolve({
                    success : true,
                    message : "Login successful",
                    user : {
                        id : data.id,
                        email : data.email,
                        username : data.name,
                        balance : data.balance
                    }
                });
                
            }).catch(err => reject(err))
        }else{
            user = getUser(identifier).then(data => {
                if(!data){
                    return reject({
                        success : false,
                        error : "Not Found",
                        message : "User not found. Please double-check your username and try again or register for a new account."
                    })
                }
                if(data.password !== password){
                    return reject({
                        success : false,
                        error: "Unauthorized",
                        message : "Unauthorized",
                        message: "Incorrect password. Please double-check your password and try again."
                    });
                };
                return resolve({
                    success : true,
                    message : "Login successful",
                    user : {
                        id : data.id,
                        email : data.email,
                        username : data.name,
                        balance : data.balance
                    }
                });
            }).catch(err => reject(err))
        }
    })
}

module.exports = {loginUser};