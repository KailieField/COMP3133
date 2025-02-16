const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {

        type: String, 
        required: [ true, 'NAME IS MANDATORY.' ],

    },

    username: {

        type: String,
        required: [ true, 'USERNAME IS MANDATORY 4 CHARCATERS.' ]

    },

    email: {

        type: String,
        required: [ true, 'EMAIL IS MANDATORY.' ],
        match: [ /^\S+@\S+\.\S+$/, 'INVALID EMAIL FORMAT' ],

    },

    address: {

        street: {
        type: String,
        required: [ true, 'STREET IS MANDATORY.' ],


        },


        suite: {

            type: String, 
            required: [ true, 'SUITE IS MANDATORY.' ],

        },

        city: {

            type: String,
            required: [ true, 'CITY IS MANDATORY.' ],
            match: [ /^[a-zA-Z\s]+$/, 'ONLY LETTERS AND SPACES.' ],

        },

        zipcode: {

            type: String, 
            required: [ true, 'ZIPCODE IS MANDATORY.' ],
            match: [ /^\d{5}-\d{4}$/, 'FORMAT DDDDD-DDDD'],

        },

    },

    phone: {

        type: String,
        required: [ true, 'PHONE IS MANDATORY.' ],
        match: [ /^\d-\d{3}-\d{3}-\d{4}$/, 'FORMAT D-DDD-DDD-DDDD' ],

    },

    website: {

        type: String,
        required: [ true, 'URL IS MANDATORY.' ],
        match: [/^(https?:\/\/)[^\s$.?#].[^\s]*$/, ' INVALID URL.'],

    },


});

module.exports = mongoose.model('User', UserSchema);