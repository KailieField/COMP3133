const { Transform } = require('stream');

class ToWordsPipe extends Transform {
   constructor() {
      super()
      this._transform = (chunk, encoding, cb) => {
         cb(null, chunk.toString().replaceAll(' ', "\r\n"))
      }
   }
}

module.exports = ToWordsPipe