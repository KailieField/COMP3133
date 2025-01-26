const fs = require('fs')

console.log("--- START ---")

// READ FILE ASYNC
// -- fs.readFile("input.txt", "utf-8", (err, data) 
fs.readFile("input.txt", (err, data) => {

    if(err){
        console.log(err)
        return
    }

    console.log(`ASYNC: ${data.toString()}`)

})

// SYNCHRONOUS
const dataSync = fs.readFileSync("input.txt")
console.log(`SYNC: ${dataSync.toString()}`)


// ASYNC WITH PROMISE
fs.promises.readFile("input.txt")
.then((data => {
    console.log(`ASYNC PROMISE: ${data.toString()}`)
}))
.catch((err) => {
    console.log(err)
})
console.log(`SYNC: ${dataSync.toString()}`)


console.log("--- END ---")