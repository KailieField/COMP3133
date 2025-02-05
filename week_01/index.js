///////////////////////////////////////// LAB WEEK 01 COMP3133 /////////////////////////////////////////

// Difference between CACHE and BUFFER:
//       --- CACHE: temporary storage, fast storage when we want to retrieve it
//       --- BUFFER: temporary storage, when you read the value from the buffer its gone (que or stream of data)

console.log("Week01 - Buffer Examples")

// let b1 = new Buffer('A Hello') // deprecated

let b1 = Buffer.from('A Hello 👽') // presents in HEX

console.log(b1)
console.log(b1.toString()) // <--- after using toString you can trim

console.log(b1[0])  // <--- 65 -- individual byte

console.log(b1.toString('ascii'))
console.log(b1.toString('utf8'))
console.log(b1.toString('hex'))
console.log(b1.toString('base64')) // <--- use when hashing
console.log(b1.toString('ucs-2'))

console.log(b1.includes("He")) // -- true

console.log(b1.length)

// Alloc function -- low level manipulation of all of th data

let b2 = Buffer.alloc(10) //<-- fixed size of 10
// let b2 = Buffer.alloc(10, 'A')
console.log(b2)
b2[10] = 66 
console.log(b2[10])
console.log(b2.length)
b2[0] = 65 //'👽'
console.log(b2[0])
console.log(b2.toString())

let b3 = Buffer.allocUnsafe(20)
console.log(b3)
b3.fill('BYE')
console.log(b3)
console.log(b3.toString())

let b4 = Buffer.from('Hello👽World')
console.log(b4)
console.log(b4.toString())
console.log(b4[0])
console.log(b4.toString('utf8', 5, 9)) // <--- 👽 will be displayed

// Locate function
let b6 = Buffer.concat([b3, b4])
console.log(b6.toString())

// slice
// Hello👽World

let b7 = b6.slice(20, 34) // <--- Hello👽World
console.log(b7.toString())

let b8 = Buffer.alloc(10)
b8.write('Buffer', 2) // <-- from the second position, write
console.log(b8)
console.log(b8.toString())

// console.log(b8.read())

// for(let c in b8){       // <-- prints all of the functions
//     console.log(c)
// } 

console.log(Buffer.isBuffer(b8))    //<-- True
console.log(Buffer.isBuffer(100))   //<-- False

// console.log(b8.entries()) 
for(c of b8.entries()){
    console.log(c)
}

let b9 = Buffer.alloc(10)
b8.copy(b9, 0, 2, 8) //<-- Buffer [ start, byte length, end ] 
console.log(b9.toString())

let bufferJson = b9.toJSON()
console.log(bufferJson.data) //<-- array of bytes

let b10 = Buffer.from(bufferJson.data)
console.log(b10.toString()) 

const arrayBytes = [0x41, 0x20, 0x48, 0x65, 0x6c, 0x6c, 0x6f]
let b11 = Buffer.from(arrayBytes)
console.log(b11.toString())

let arrayBuffer = new ArrayBuffer(10)
arrayBuffer[0] = 65
let b12 = Buffer.from(arrayBuffer, 0, 2)
console.log(b12)