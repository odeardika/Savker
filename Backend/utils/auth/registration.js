const emailValidator = require("email-validator");
const {createUser} = require('../database/prismaUtils');
 
// validator.validate("test@email.com"); // true

async function regisUser(name, email, password){
    return new Promise((resolve, reject) => {
        // check if email in the correct format
        if(!emailValidator.validate(email)){
            return reject({
                error : "Email is not valid",
                message : "The email you entered is not valid. Please check and try again."
            })
        }
        createUser(name, email, password)
        .then(data => {
            resolve(data)
        })
        .catch(error => {
            if(error['code'] === 'P2002') {
                reject({
                    error : 'Email or username already exists',
                    message : 'The email address or username you entered is already registered. If you already have an account, please log in. If you forgot your password, you can reset it.'
                })
            }
            reject(error)
            })

    })
}

module.exports = {regisUser};


