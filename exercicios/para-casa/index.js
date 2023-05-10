const books = require("./library.json") // Os valores das propriedades dos usuários e livros
const users = require("./users.json")   // foram gerados automaticamente com ajuda do ChatGPT

// Declaração das promisses, usando o promise constructor
const findBookByID = (id) => {
    return new Promise((resolve, reject) => {
        const foundBook = books.find((book) => book.id === id)

        if (foundBook) {
            resolve(foundBook)
        } else {
            reject("Book not found.")
        }
    })
}

const findUserByID = (id) => {
    return new Promise((resolve, reject) => {
        const foundUser = users.find((user) => user.id === id)

        if (foundUser) {
            resolve(foundUser)
        } else {
            reject("User not Found.")
        }
    })
}

const showBook = (book) => {
    console.log(`Title: ${book.title}`)
    console.log(`Author: ${book.autor}`)
}

const showUser = (user) => {
    console.log(`Name: ${user.name}`)
    console.log(`Email: ${user.email}`)
}

const bookID = Math.floor(Math.random() * 10 - 1)

const bookPromise = findBookByID(bookID)

bookPromise
    .then((book) => {
        showBook(book)
        console.log("---")
        console.log("Users:\n")
        return Promise.all(
            book.users.map((userID) => findUserByID(userID))
        )
    })
    .then((users) => {
        users.forEach((user) => {
            showUser(user)
            console.log("\n")
        })
    })
    .catch((error) => {
        console.log("Error:", error)
    })