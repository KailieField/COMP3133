const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username : {

        type : String,
        unique: true,
        required: true
    },

    firstname: String,
    
    lastname: String,

    password: { 

        type: String,
        required: true,

    },

    dateCreated: {
        
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('User', UserSchema);