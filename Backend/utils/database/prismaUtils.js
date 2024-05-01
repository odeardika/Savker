const { PrismaClient } = require('@prisma/client')

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

module.exports = createUser