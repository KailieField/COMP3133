const fs = require('fs')


// WRITE ASYNC CALL BACK
// let dataToWrite = "Welcome to George Brown College"
let dataToWrite = Buffer.from("Welcome to George Brown College")
fs.writeFile("output.txt", dataToWrite, (err) => {

    if(err){
        console.log(err)
        return
    }

    console.log('Async callback success.')
})


// SYNC
fs.writeFileSync("output.txt", dataToWrite)

// ASYNC PROMISE
fs.promises.writeFile("output.txt", dataToWrite)
.then(() => {
    console.log('Async callback success.')
})
.catch((err) => {

    console.log(err)

})