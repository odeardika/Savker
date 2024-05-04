const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function createUser(name, email, password) {
    const user = await prisma.user.create({
        data: {
            name : name,
            email : email,
            password : password,
            balance : 0
        }
    })
    return {
        id : user.id,
        username : user.name,
        email : user.email,
        balance : user.balance
    }
}

async function getUser(identifier, identifierType){
    if(identifierType === "email"){
        const user = await prisma.user.findUnique({
            where : {
                email : identifier
            }
        });
        return user;
    }else{
        const user = await prisma.user.findUnique({
            where : {
                name : identifier
            }
        });
        return user;
    }
}
// getUser("o").then(data => {
//     return console.log(!data);
// }).catch(err => {
//     return console.error(err)
// });

module.exports = {createUser, getUser}