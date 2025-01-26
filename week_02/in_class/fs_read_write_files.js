const fs = require('fs')

fs.open('data.txt', 'r+', (err, fd) => {


    if(err){
        console.log(err)
        return
    }

    var buffer = Buffer.alloc(10)
    fs.readSync(fd, buffer, 0, buffer.length)
    console.log(buffer.toString())


    // var buffer = Buffer.alloc(5)
    // fs.readSync(fd, buffer, 0, buffer.length)
    // console.log(buffer.toString())

    // var buffer = Buffer.alloc(10)
    // fs.readSync(fd, buffer, 0, buffer.length)
    // console.log(buffer.toString())

    fs.writeSync(fd, Buffer.from('Toronto'), 0, 6, 21)
  

    fs.closeSync(fd)

})
