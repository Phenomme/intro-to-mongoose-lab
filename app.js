const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const Customer = require ("./models/customer.js")


const connect = async () => {
await mongoose.connect(process.env.MONGODB_URI)
//   console.log('Connected to MongoDB')

}
connect()

const prompt = require('prompt-sync')();

// const username = prompt('What is your name? ');

// console.log(`Your name is ${username}`);


const crmprocess = async () => {
    let userChoice = "";

    while (userChoice !== "5") { 
      
console.log("Welcome to CRM")
console.log( "What would you like to do?")
console.log("1. Create a customer\n2. View all customers\n3. Update a customer\n4. Delete a customer\n5. Quit")
userChoice = prompt( `Number of action to run:`)
// console.log(userChoice)

if (userChoice === "1") {
    const userName = prompt("What is your name?")
    const userAge = prompt("What is your age? ")
    console.log(userName, userAge)
   const newUser =   await Customer.create({text: userName, age: userAge})
//    console.log(newUser)
    
}else if (userChoice === "2") {
    const allUser = await Customer.find()

    allUser.forEach( user => {
        console.log(`Id: ${user.id}, Name: ${user.text}, Age: ${user.age}`) 
    })
    // console.log(allUser)

}else if (userChoice === "3") {
    const allUser = await Customer.find()

    allUser.forEach( user => {
        console.log(`Id: ${user.id}, Name: ${user.text}, Age: ${user.age}`) 
    })
    const editSelection = await prompt("Copy and paste the id of the customer you would like to update here:")
    const newName = await prompt("What is the customers new name?")
    const newAge = await prompt("What is the customers new age?")

    const editUser = await Customer.findByIdAndUpdate(editSelection, {text: newName, age: newAge}, {new: true})
    console.log(`Id: ${editUser.id}, Name: ${editUser.text}, Age: ${editUser.age}`)

}else if (userChoice === "4") {
    const allUser = await Customer.find()

    allUser.forEach( user => {
        console.log(`Id: ${user.id}, Name: ${user.text}, Age: ${user.age}`) 
    })
    const deleteSelection = await prompt("Copy and paste the id of the customer you would like to delete here:")

    const deleteUser = await Customer.findByIdAndDelete(deleteSelection, {new: true})

    console.log(`Id: ${deleteUser.id}, Name: ${deleteUser.text}, Age: ${deleteUser.age}`)

}else if (userChoice === "5") {
     await mongoose.connection.close()
    console.log("Quit")
    console.log("Database connection closed ")

}else {
console.log("invalid choice")
}

    }
}

crmprocess()